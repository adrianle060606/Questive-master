import React, {useEffect, useState} from 'react';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./index";

const Messages = ({questionID, course}) => {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, `${course === "Ext1" ? course : ""}messages${questionID}`), orderBy("time"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(newData);
    });

    return () => unsubscribe();
  }, [questionID]);

  return <div>
    <div className = "about">
        <p>Coming Soon!</p>
        <p> View other people's quotes/messages...</p>

        <table>
        <tbody>
          <tr>
            <th></th>
            <th>Name</th>
          </tr>

        {data.map((item) => (
          <tr key={item.id}>
            <th>{item.message}</th>
            <th>{item.userName}</th>
          </tr>
        ))}
        </tbody>
      </table>

        
    </div>
  </div>
};

export default Messages;
