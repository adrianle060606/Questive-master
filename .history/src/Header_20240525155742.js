import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './index';

const Header = ({ theme, accountInfo, course }) => {
  const firstName = accountInfo ? accountInfo.account.name.split(' ')[0] : 'Guest';
  const [points, setPoints] = useState(0);
  const [quote, setQuote] = useState(0);

  const getPoints = async (email) => {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const userRef = await getDocs(q);
    if (!userRef.empty) {
      const user = userRef.docs[0].data();
      setPoints(user.points);
    } 
    else {
      console.error('User not found');
    }
  };

  useEffect(() => {
    if (accountInfo && accountInfo.account.userName) {
      getPoints(accountInfo.account.userName);
    }
  }, [accountInfo]);

  useEffect(() => {
    if (window.MathJax && window.MathJax.Hub) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, "math-content"]);
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, ".bannerarchive"]);
    }
  }, []);

  return (
    <div className={`header ${theme}`}>
      <div className="welcome-message">
        {`Welcome ${firstName}`}
        <p>{`Points: ${points}`}</p>
      </div>

      <div className="banner" title="Do you want your message here? Be the first to get the daily question and from there the world is your oyster!">
        {course === "Ext1" ? 
        <span></span> :
        <span>${quote}</span>
        }
      </div>

      <h1>Questive</h1>
      {course === "Ext1" ? <h4>Extension 1</h4> : <h4>Extension 2</h4>}

      <div className="nav">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/points">Points</Link>
        {//<Link to="/archive">Archive</Link> 
        }
      </div>
    </div>
  );
};

export default Header;
