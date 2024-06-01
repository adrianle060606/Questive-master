import React, {useEffect, useState} from 'react';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./index";

const Messages = ({questionID}) => {
  
  useEffect(() => {
    const q = query(collection(db, `${course === "Ext1" ? course : ""}messages${questionID}`), orderBy("time"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })).filter(item => item.correct === true);
      console.log(newData);
    });

    return () => unsubscribe();
  }, [questionID]);

  return <div>
    <div className = "about">
        <p>Coming Soon!</p>
        <p> View other people's quotes/messages...</p>
    </div>
  </div>
};

export default Messages;
