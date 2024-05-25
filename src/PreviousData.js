import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./index";

export const useSpecificData = (questionNum) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, `Question${questionNum}`), orderBy("time"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })).filter(item => item.correct === true);
      setData(newData);
    });

    return () => unsubscribe();
  }, []);

  return data;
};