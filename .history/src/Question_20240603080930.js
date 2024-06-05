import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import CountdownTimer from './CountdownTimer';
import { db } from './index';
import Confetti from 'react-confetti';

const Question = ({accountInfo, questionID, course}) => {
  const [answered, setAnswered] = useState(false);
  const [messaged, setMessaged] = useState(false);

  const [question, setQuestion] = useState("");

  const [showConfetti, setShowConfetti] = useState(false);

  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);

  const handleCorrectAnswer = () => {
    setShowConfetti(true);

    setTimeout(() => setShowConfetti(false), 5000);
  };

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'users'), where('email', '==', accountInfo.account.userName));
        const qRef = await getDocs(q);
        
        if (qRef.empty) {
          console.error('No matching documents.');
          return;
        }
        
        const docSnapshot = qRef.docs[0];
        const docData = docSnapshot.data();
        
        setYes(docData.yes);
        setNo(docData.no);
      } 
      catch (error) {
        console.error('An error occurred:', error);
      }
    };
    
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [accountInfo, course, questionID]);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const q = query(collection(db, `${course}Questions`), where('n', '==', questionID));
        const qRef = await getDocs(q);
        
        if (qRef.empty) {
          console.log(questionID + " " + course);
          console.error('No matching documents.');
          return;
        }
        
        const docSnapshot = qRef.docs[0];
        const docData = docSnapshot.data();
        const cleanedLaTeX = docData.LaTeX.replace(/\\\\/g, '\\');
        
        if (isMounted) {
          setQuestion(cleanedLaTeX); 
        }
      }
      catch (error) {
        console.error('An error occurred:', error);
      } 
    };
    
    fetchData();

    return () => {
      isMounted = false; 
    };
  }, [course, questionID]); 

  
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    }
    const unsubscribe = listenForUpdates(accountInfo.account.userName);
    return () => unsubscribe();
  }, [accountInfo, question, yes, no]);

  const listenForUpdates = (email) => {
    const q = query(collection(db, 'users'), where('email', '==', email));
    return onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        if(course === "Ext2") {
          setAnswered(data.answered);
          setMessaged(data.messaged);
        }
        else {
          setAnswered(data.Ext1answered);
          setMessaged(data.Ext1messaged);
        }
      } 
      else {
        console.error('User not found');
      }
    });
  };

  const handleSubmitMessage = async (event) => {
    event.preventDefault();
    const message = document.getElementById('answerBox').value;
    document.getElementById('answerBox').value = "";
    try {
      await addDoc(collection(db, `${course === "Ext1" ? course : ""}messages${questionID}`), {
        message,
        userName: accountInfo.account.userName,
        name: accountInfo.account.name.split(' ')[0],
        time: Date.now()
      });
      updateMessaged(accountInfo.account.userName);
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  const updateMessaged = async (email) => {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const userRef = await getDocs(q);
    if (!userRef.empty) {
      const docId = userRef.docs[0].id;
      const docRef = doc(db, 'users', docId);
      if(course === "Ext2") {
        await updateDoc(docRef, {
          messaged: true,
        });
      }
      else {
        await updateDoc(docRef, {
          Ext1messaged: true,
        });
      }
    } else {
      console.error('User not found');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    const q = query(collection(db, `${course}Questions`), where('n', '==', questionID));
    const qRef = await getDocs(q);
    
    if (qRef.empty) {
      console.log(questionID + " " + course);
      console.error('No matching documents.');
      return;
    }
    
    const docSnapshot = qRef.docs[0];
    const docData = docSnapshot.data();
    const theAnswer = docData.answer;

    const answer = document.getElementById('answerBox').value.trim();
  
    if(answer == theAnswer) {
      handleCorrectAnswer();
    }
  
    document.getElementById('answerBox').value = "";
  
    try {
      await addDoc(collection(db, `${course === "Ext1" ? course : ""}Question${questionID}`), {
        answer: answer,
        user: accountInfo.account.name,
        time: Date.now(),
        correct: answer==theAnswer
      });
  
      const q = query(collection(db, 'users'), where('email', '==', accountInfo.account.userName));
      const userRef = await getDocs(q);
      if (!userRef.empty) {
        const docId = userRef.docs[0].id;
        const docRef = doc(db, 'users', docId);
        if(course === "Ext2") {
          await updateDoc(docRef, {
            answered: true,
          });
        }
        else {
          await updateDoc(docRef, {
            Ext1answered: true,
          });
        }
      } else {
        console.error('User not found');
      }
  
      console.log('Answer submitted!');
    }
    catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  return (
    <div>
      {showConfetti && <Confetti run ={true} gravity={0.2} recycle = {false}/>}
      <CountdownTimer />
      <div id="math-content">
          {`$$${question}$$`}
      </div>
      <div className="question">
        <textarea 
          id="answerBox" 
          onInput={autoResize} 
          placeholder={
            answered 
              ? messaged 
                ? "You have already answered" 
                : "Enter your custom message"
              : "Type your answer here..."
          }
          disabled={answered && messaged}
        />
        <button 
          id="submitBtn" 
          type="submit" 
          onClick={(event) => {
            if (answered && !messaged) {
              handleSubmitMessage(event);
            } else if (!answered) {
              handleSubmit(event, accountInfo, questionID, course);
            }
          }}
          disabled={answered && messaged}
        >
          Submit
        </button>
        <p className="notice">You can only submit once per question.</p>
        <p className="notice">A new question comes daily at 6:30pm.</p>
        
        <p className="notice">Have any questions or feedback? Message me on the <a href = "https://discord.gg/vXBUESp4X9" target="_blank"><u><b>Questive Discord Server</b></u></a>.</p>
      </div>
    </div>
  );
};

function autoResize(event) {
  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 6 + 'px';
}

export default Question;