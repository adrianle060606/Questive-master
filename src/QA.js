import React, { useState, useEffect } from 'react';
import { collection, query, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from './index';

const QA = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  
  useEffect(() => {
    const q = query(collection(db, "questions"));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setQuestions(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
    });
    
    return () => unsubscribe();
  }, []);
  
  const addQuestion = async () => {
    await addDoc(collection(db, "questions").add({
      content: newQuestion,
      timestamp: Date.now(),
    }));
    setNewQuestion('');
  };
  
  return (
    <div>
      <input type="text" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
      <button onClick={addQuestion}>Ask</button>
      <ul>
        {questions.map(({ id, data }) => (
          <li key={id}>{data.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default QA;