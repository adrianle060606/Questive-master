import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { collection, addDoc, onSnapshot, doc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from './index';

const Comp = ({accountInfo}) => {
    const navigate = useNavigate();

    const [content10min, setContent10min] = useState(null);
    const [content20min, setContent20min] = useState(null);
    const [content30min, setContent30min] = useState(null);

    const [gameId, setGameId] = useState(null);

    const fetchAndRenderData = (time, setContent) => {
        const timeCollection = collection(db, time);
    
        const unsubscribe = onSnapshot(timeCollection, querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            if(data.length >= 2) {
                startGame(time, data);
            }
    
            const content = (
                <div>
                    {data.map(item => (
                        <p key={item.id}>{item.user}</p>
                    ))}
                </div>
            );
    
            setContent(content);
        });

        return unsubscribe;
    };

    const gameExists = async (time) => {
        const gameCollection = collection(db, 'games');
        const q = query(gameCollection, where("timeMode", "==", time), where("status", "==", "waiting"));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };
      
    const startGame = async (time, players) => {
        const exists = await gameExists(time);
      
        // If a game already exists, don't create a new one
        if (exists) return;
      
        const gameRef = collection(db, 'games');
        const gameData = {
          players: players.map(player => player.user),
          timeMode: time,
          status: 'waiting',
        };
      
        try {
          const docRef = await addDoc(gameRef, gameData);
          console.log('Game created!', docRef.id);
          setGameId(docRef.id);
        } 
        catch (error) {
          console.error('Error creating game: ', error);
        }
    };

    useEffect(() => {
        if (gameId) {
            navigate(`/game/${gameId}`);
        }
    }, [gameId]);      

    const handleLeave = async (accountInfo) => {
        const firstName = accountInfo ? accountInfo.account.name.split(' ')[0] : 'Guest';

        const timeSlots = ["10min", "20min", "30min"];

        for (const slot of timeSlots) {
            const timeCollection = collection(db, slot);
            const q = query(timeCollection, where("user", "==", firstName));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (docSnapshot) => {
                await deleteDoc(doc(db, slot, docSnapshot.id));
            });
        }
    };

    const handleJoin = async (event, accountInfo, time) => {
        event.preventDefault();
        const firstName = accountInfo ? accountInfo.account.name.split(' ')[0] : 'Guest';

        // Remove the user from other time slots
        const timeSlots = ["10min", "20min", "30min"];
        for (const slot of timeSlots) {
            if (slot === time) continue;
            const timeCollection = collection(db, slot);
            const q = query(timeCollection, where("user", "==", firstName));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (docSnapshot) => {
                await deleteDoc(doc(db, slot, docSnapshot.id));
            });
        }

        // Check if the user has already joined this time slot
        const timeCollection = collection(db, time);
        const q = query(timeCollection, where("user", "==", firstName));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            try {
                await addDoc(collection(db, time), {
                    user: firstName
                });
                console.log('Joined!');
            } catch (error) {
                console.error('Error writing document: ', error);
            }
        } else {
            console.log('You have already joined this time slot.');
        }
    };

    useEffect(() => {
        const unsubscribe10min = fetchAndRenderData('10min', setContent10min);
        const unsubscribe20min = fetchAndRenderData('20min', setContent20min);
        const unsubscribe30min = fetchAndRenderData('30min', setContent30min);

        // Event listener for visibility change
        const visibilityChangeHandler = () => {
            if (document.visibilityState === 'hidden') {
                handleLeave(accountInfo);
            }
        };

        document.addEventListener('visibilitychange', visibilityChangeHandler);

        return () => {
            unsubscribe10min();
            unsubscribe20min();
            unsubscribe30min();
            document.removeEventListener('visibilitychange', visibilityChangeHandler);
        };
    }, [accountInfo]);

    return (
        <div>
            <h2 id="select">Select Time Mode</h2>
            <div className="timemode">
                <div id="selection">
                    <button onClick={(event) => handleJoin(event, accountInfo, "10min")}>10 min</button>
                    {content10min}
                </div>
                <div id="selection">
                    <button onClick={(event) => handleJoin(event, accountInfo, "20min")}>20 min</button>
                    {content20min}
                </div>
                <div id="selection">
                    <button onClick={(event) => handleJoin(event, accountInfo, "30min")}>30 min</button>
                    {content30min}
                </div>
            </div>
            <button id="leave" onClick={(event) => handleLeave(accountInfo)}>Leave</button>
        </div>
    );
};

export default Comp;