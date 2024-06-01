import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { db } from "./index";
import { getOrdinalHTML, gainedPointsFromUser } from './Extra';

const Leaderboard = ({ questionID, course }) => {
    const [overallData, setOverallData] = useState([]);
    const [previousPoints, setPreviousPoints] = useState([]);
    const [previousData, setPreviousData] = useState([]);
    useEffect(() => {
        const q = query(collection(db, "users"), orderBy(`${course === "Ext1" ? "Ext1" : ""}points`, "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })).filter(item => !((item.points === 0 && course === "Ext2") || (item.Ext1points === 0 && course === "Ext1")) );
            setOverallData(newData);
        });
        return () => unsubscribe();
    }, [questionID, course]);

    useEffect(() => {
        const q = query(collection(db, `${course === "Ext1" ? course : ""}Question${questionID - 1}`), orderBy("time"));
        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const newData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })).filter(item => item.correct === true);
            setPreviousData(newData);
    
            const newPoints = await Promise.all(newData.map(async (item) => {
                return await gainedPointsFromUser(item.user, course);
            }));
            setPreviousPoints(newPoints);
        });
    
        return () => unsubscribe();
    }, [questionID, course]);    

    useEffect(() => {
        if (window.MathJax && window.MathJax.Hub) {
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, "math-content"]);
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, ".bannerarchive"]);
        }
    }, [course]);
  
    return <div>
        <h2>Overall Leaderboard</h2>
        <div className = "about">
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>

                    {overallData.map((item, index) => (
                        <tr key={item.id}>
                            {getOrdinalHTML(index)}
                            
                            <th>{course === "Ext2" ? item.points : item.Ext1points}</th>
                        </tr>
                    ))}

                    
                </tbody>
            </table>
        </div>
        <h2>Previous Question Leaderboard</h2>
        <div className = "about">
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Time</th>
                        <th>Points Gained</th>
                    </tr>

                    {previousData.map((item, index) => (
                        <tr key={item.id}>
                            {getOrdinalHTML(index)}
                            <th>{item.user}</th>
                            <th>{(new Date(item.time)).toLocaleTimeString("en-US")}</th>
                            <th>{previousPoints[index]}</th>
                        </tr>
                    ))}
                </tbody> 
            </table>
            <p id = "pointsmessage"><Link to = "/points"><u>How do points work?</u></Link></p>
        </div>
    </div>
};

export default Leaderboard;
