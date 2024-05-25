import React, {useEffect, useState} from 'react';
import Question from './Question';
import { Link } from 'react-router-dom';
import { getOrdinalHTML, updateRanks, updateOverallPoints, resetAnswered } from './Extra';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./index";

const Home = ({ accountInfo, questionID, course, questivians}) => {
  const [previousData, setPreviousData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, `${course === "Ext1" ? course : ""}Question${questionID - 1}`), orderBy("time"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })).filter(item => item.correct === true);
      setPreviousData(newData);
    });

    return () => unsubscribe();
  }, [questionID]);

  var adminHTML = <div></div>;
  console.log(accountInfo.account.name)
  if(accountInfo.account.name == "Morgan Stoodley" || accountInfo.account.name == "Adrian Le" || accountInfo.account.name == "Test User") {
    adminHTML = <div id = "admin">
      <h4>Admin Control Panel</h4>
      <button id="adminBtn" onClick = {() => {resetAnswered(); console.log("Reset");}}>Reset Answered/Messaged</button>
      <button id="adminBtn" onClick = {() => {updateRanks(); console.log("Ranks Updated");}}>Update Ranks</button>
      <button id="adminBtn" onClick = {() => {updateOverallPoints(); console.log("Points Updated");}}>Update Points</button>
      <button id="adminBtn" onClick = {() => {resetAnswered(); updateRanks(); updateOverallPoints(); console.log("Did it all!");}}>Do it all!</button>
    </div>;
  }

  return <div>
    <h4 id = "questivians">There {questivians == 1 ? "is" : "are"} {questivians == 0 ? "no other" : `${questivians} fellow`} {questivians == 1 ? "Questivian" : "Questivians"} online. {questivians == 0 ? "It is just you." : ""}</h4>
    <br/>
    
    <Question accountInfo={accountInfo} questionID={questionID} course={course} />

    <div className="smallleaderboard">
      <h2><Link to="/archive"><u>Previous Question</u></Link> Top 5</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Name</th>
          </tr>

          {previousData.slice(0, 5).map((item, index) => (
            <tr key={item.id}>
              {getOrdinalHTML(index)}
              <th>{item.user}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <p><Link to="/leaderboard"><u>More Information</u></Link></p>
    </div>
    {adminHTML}
  </div>
};

export default Home;
