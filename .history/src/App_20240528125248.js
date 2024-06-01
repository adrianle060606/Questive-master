import React, { useState, useLayoutEffect, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Comp from './Comp';
import Game from './Game';
import QA from './QA';
import About from './About';
import Leaderboard from './Leaderboard';
import Points from './Points';
import Shop from './Shop';
import Archive from './Archive';
import Header from './Header';
import Footer from './Footer';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from './AuthProvider';
import Loading from './Loading';
import './style.css';
import { collection, query, where, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './index';

const isLocal = process.env.REACT_APP_IS_LOCAL === 'true';
const questionIDExt1 = 10;

/*
  ideas:
  shop
  messages
  streaks
  incorrect feedback
*/

const questionIDExt2 = 1;

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [course, setCourse] = useState(() => {
    return localStorage.getItem('course') || 'Ext2';
  });
  const [questionID, setQuestionID] = useState(() => {
    const newCourse = localStorage.getItem('course') || 'Ext2';
    return newCourse === "Ext1" ? questionIDExt1 : questionIDExt2;
  });

  const [questivians, setQuestivians] = useState(0);
  const [accountInfo, setAccountInfo] = useState(null);

  const toggleCourse = () => {
    const newCourse = (course === "Ext1") ? "Ext2" : "Ext1";
    setCourse(newCourse);
    localStorage.setItem('course', newCourse);
    setQuestionID(newCourse === "Ext1" ? questionIDExt1 : questionIDExt2);
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useLayoutEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const updateActiveUsers = async (docId) => {
    const docRef = doc(db, 'users', docId);
  
    const intervalId = setInterval(async () => {
      await updateDoc(docRef, {
        lastActive: Date.now(),
      });
  
      const userQuery = query(collection(db, 'users'));
      const userSnapshot = await getDocs(userQuery);
      let count = 0;
  
      userSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.email != docRef.email && userData.lastActive >= Date.now() - 10 * 60 * 1000) {
          count++;
        }
      });
  
      setQuestivians(count);
    }, 60 * 1000);
  
    return () => clearInterval(intervalId);
  };
  
  useEffect(() => {
    if (accountInfo && accountInfo.account) {
      storeUser(accountInfo.account.name, accountInfo.account.userName)
        .then((docId) => {
          const cleanup = updateActiveUsers(docId);
          return () => {
            cleanup();
          };
        });
    }
  }, [accountInfo]);
  
  const storeUser = async (name, email) => {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const emailExists = await getDocs(q);
    let docId;
    if (emailExists.empty) {
      const docRef = await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        time: Date.now(),
        lastTime: Date.now(),
        points: 0,
        answered: false
      });
      docId = docRef.id;
    }
    else {
      const userRef = await getDocs(q);
      docId = userRef.docs[0].id;
      const docRef = doc(db, 'users', docId);
      await updateDoc(docRef, {
        lastTime: Date.now(),
        lastActive: Date.now(),
      });
    }

    const userQuery = query(collection(db, 'users'));
    const userSnapshot = await getDocs(userQuery);
    let count = 0;

    userSnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.email != email && userData.lastActive >= Date.now() - 10 * 60 * 1000) {
        count++;
      }
    });

    setQuestivians(count);

    return docId;
  };

  if (isLocal) {
    const dummyAccountInfo = { account: { name: 'Test User', userName: 'test@example.com' } };

    return (
      <div>
        <Router>
          <Header theme={theme} accountInfo={dummyAccountInfo} course = {course} />
          <Routes>
            <Route path="/home" element={<Home accountInfo={dummyAccountInfo} questionID={questionID} course={course} questivians = {questivians}/>} />
            <Route path="/comp" element={<Comp accountInfo={dummyAccountInfo} />} />
            <Route path="/qa" element={<QA />} />
            <Route path="/about" element={<About />} />
            <Route path="/leaderboard" element={<Leaderboard questionID={questionID} course={course}/>} />
            <Route path="/point" element={<Points />} />
            <Route path="/shop" element={<Points />} />
            <Route path="/archive" element={<Archive course = {course}/>} />
            <Route path="/comp/:roomId" element={<Comp accountInfo={dummyAccountInfo} />} />
            <Route path="/game/:roomId" element={<Game />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
          <Footer theme={theme} toggleTheme={toggleTheme} toggleCourse = {toggleCourse} course={course}/>
        </Router>
      </div>
    );
  } else {
    return (
      <AzureAD provider={authProvider} forceLogin={true}>
        {
          ({ login, logout, authenticationState, accountInfo }) => {
            if (authenticationState === "Unauthenticated") {
              return <Loading />;
            }

            if (authenticationState === "Authenticated") {
              storeUser(accountInfo.account.name, accountInfo.account.userName);

              setAccountInfo(accountInfo);

              return (
                <div>
                  <Router>
                    <Header theme={theme} accountInfo={accountInfo} course = {course} />
                    <Routes>
                      <Route path="/home" element={<Home accountInfo={accountInfo} questionID={questionID} course={course} questivians = {questivians}/>} />
                      <Route path="/comp" element={<Comp accountInfo={accountInfo}/>} />
                      <Route path="/qa" element={<QA />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/leaderboard" element={<Leaderboard questionID={questionID} course={course}/>} />
                      <Route path="/points" element={<Points />} />
                      <Route path="/archive" element={<Archive course = {course}/>} />
                      <Route path="/comp/:roomId" element={<Comp accountInfo={accountInfo} />} />
                      <Route path="/game/:roomId" element={<Game />} />
                      <Route path="/" element={<Navigate to="/home" />} />
                    </Routes>
                    <Footer theme={theme} toggleTheme={toggleTheme} toggleCourse = {toggleCourse} course={course}/>
                  </Router>
                </div>
              );
            }

            return null;
          }
        }
      </AzureAD>
    );
  }
}

export default App;
export { questionIDExt1, questionIDExt2 };