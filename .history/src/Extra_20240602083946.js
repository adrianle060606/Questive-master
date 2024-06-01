import { collection, query, where, getDocs, addDoc, doc, updateDoc, orderBy, deleteField, deleteDoc } from 'firebase/firestore';
import { db } from './index';
import { questionIDExt1, questionIDExt2 } from "./App";

function ordinalSuffixOf(i) {
    var j = i % 10, k = i % 100;
    if (j === 1 && k !== 11) {
        return "st";
    }
    if (j === 2 && k !== 12) {
        return "nd";
    }
    if (j === 3 && k !== 13) {
        return "rd";
    }
    return "th";
}

function getOrdinalHTML(i) {
    return <th width = "50px">
        <div className="ordinal-cell">
            <span>{i + 1}<sup>{ordinalSuffixOf(i + 1)}</sup></span>
            <span>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : ""}</span>
        </div>
    </th>
}

function gainedPointsFromRankArray(ranks) {
    if(ranks == null) return 0;
    if(ranks.length === 0) return 0;

    ranks.reverse();
    if(ranks[0] === 0) return 0;

    const basePoints = 5;
    const bonusFromRank = [
        10,
        8,
        6,
        5,
        4,
        3,
        2,
        1,
        1,
        1
    ];

    var streakBonus = 0;
    for(var i = 1; i < ranks.length; i++) {
        if(ranks[i] === 0) {
            break;
        }
        else {
            streakBonus += 2;
        }
    }

    if(basePoints + streakBonus >= 19) {
        streakBonus = 19 - basePoints;
    }

    let gainedPoints = basePoints;
    gainedPoints += streakBonus;
    if(ranks[0] - 1 <= 9) gainedPoints += bonusFromRank[ranks[0] - 1];

    let max = 0;
    for(var i = 1; i < ranks.length; i++) {
        if(ranks[i] == 0 || ranks[i] > 10) break;
        let maxRank = 0;
        for(var j = 0; j <= i; j++) {
            if(ranks[j] > maxRank) {
                maxRank = ranks[j];
            }
        }
        if(maxRank - 1 > 10) continue;
        let bonus = Math.ceil((bonusFromRank[maxRank - 1] / 2.0) * i);
        if(bonus > max) {
            max = bonus;
        }
    }

    if(max > 30) {
        max = 30;
    }

    gainedPoints += max;
    if(gainedPoints > 30) {
        gainedPoints = 30;
    }

    return gainedPoints;
}

async function gainedPointsFromUser(name, course) {
    const q = query(collection(db, 'users'), where('name', '==', name));
    const userRef = await getDocs(q);
    if (userRef.docs.length > 0) {
        const docSnapshot = userRef.docs[0];
        const docData = docSnapshot.data();
        
        const ranks = course == "Ext2" ? docData.ranks : docData.Ext1ranks;
        return gainedPointsFromRankArray(ranks);
    } 
    else {
        console.log("No document found with that name");
    }
    return 0;
}

async function deleteDuplicateAccounts(name, course) {
    const userQuery = query(collection(db, 'users'));
    const userSnapshot = await getDocs(userQuery);
    let users = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    var uniqueUsers = [];
    for (let i = 0; i < users.length; i++) {
        console.log(uniqueUsers);
        if (uniqueUsers.includes(users[i].email)) {
            const docRef = doc(db, 'users', users[i].id);
            await deleteDoc(docRef);
        } else {
            uniqueUsers.push(users[i].email)
        }
    }
}


async function updateRanks(questionID) {
    const userQuery = query(collection(db, 'users'));
    const userSnapshot = await getDocs(userQuery);
    let users = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    for (let i = 0; i < users.length; i++) {
        const docRef = doc(db, 'users', users[i].id);
        await updateDoc(docRef, { ranks: [] });
        users[i].ranks = [];
        await updateDoc(docRef, { Ext1ranks: [] });
        users[i].Ext1ranks = [];
    }

    for (let i = 1; i <= questionID; i++) {
        const questionQuery = query(collection(db, `Question${i}`), orderBy('time'));
        const questionSnapshot = await getDocs(questionQuery);
        const ranks = questionSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })).filter(item => item.correct === true);

        for (let j = 0; j < users.length; j++) {
            let newRanks = users[j].ranks;
            newRanks.push(0);
            const docRef = doc(db, 'users', users[j].id);
            await updateDoc(docRef, { ranks: newRanks });
        }

        for (let j = 0; j < ranks.length; j++) {
            for (let k = 0; k < users.length; k++) {
                if (ranks[j].user === users[k].name) {
                    let newRanks = users[k].ranks;
                    newRanks[newRanks.length - 1] = j + 1;
                    const docRef = doc(db, 'users', users[k].id);
                    await updateDoc(docRef, { ranks: newRanks });
                }
            }
        }
    }
}

async function updateOverallPoints() {
    const userQuery = query(collection(db, 'users'));
    const userSnapshot = await getDocs(userQuery);
    let users = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    for (let i = 0; i < users.length; i++) {
        var newPoints = 0;
        var ranks = [...users[i].ranks];
        
        for(let j = 0; j < ranks.length; j++) {
            let newRanks = ranks.slice(0, j + 1);
            newPoints += gainedPointsFromRankArray(newRanks);
        }

        const docRef = doc(db, 'users', users[i].id);
        await updateDoc(docRef, { points: newPoints });
    }

    for (let i = 0; i < users.length; i++) {
        var newPoints = 0;
        var ranks = [...users[i].Ext1ranks];
        
        for(let j = 0; j < ranks.length; j++) {
            let newRanks = ranks.slice(0, j + 1);
            newPoints += gainedPointsFromRankArray(newRanks);
        }

        const docRef = doc(db, 'users', users[i].id);
        await updateDoc(docRef, { Ext1points: newPoints });
    }
}

async function resetAnswered() {
    const userQuery = query(collection(db, 'users'));
    const userSnapshot = await getDocs(userQuery);
    let users = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    for (let i = 0; i < users.length; i++) {
        const docRef = doc(db, 'users', users[i].id);
        await updateDoc(docRef, { answered: false, messaged: false });
        await updateDoc(docRef, { Ext1answered: false, Ext1messaged: false });
    }
}



export { resetAnswered, ordinalSuffixOf, getOrdinalHTML, gainedPointsFromRankArray, gainedPointsFromUser, updateRanks, updateOverallPoints, deleteDuplicateAccounts };