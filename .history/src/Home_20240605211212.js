import React, {useEffect, useState, Component} from 'react';
import Question from './Question';
import { Link } from 'react-router-dom';
import { getOrdinalHTML, updateRanks, updateOverallPoints, resetAnswered } from './Extra';
import { collection, query, orderBy, where, getDocs, addDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from "./index";

const Home = ({ accountInfo, questionID, course, questivians}) => {
  const [previousData, setPreviousData] = useState([]);
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    
    const q = query(collection(db, `${course === "Ext1" ? course : ""}Question${questionID}`), orderBy("time"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })).filter(item => item.correct === true);
      setPreviousData(newData);
    });

    return () => unsubscribe();

  }, [questionID]);

    useEffect(() => {
    const q = query(collection(db, `chatRoom`), orderBy("time"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatData(newData)
    });

    return () => unsubscribe();

    

  }, [questionID]);




  const handleSubmitChat = async (event) => {
    const message = document.getElementById('message-input').value;
    document.getElementById('message-input').value = "";
    if (accountInfo.account.name.split(' ')[0] != "Hongyi") {
      try {
        await addDoc(collection(db, `chatRoom`), {
          name: accountInfo.account.name.split(' ')[0],
          content: message,
          time: Date.now()
        });
      } catch (error) {
        console.error('Error writing document: ', error);
      }
    }
  };

  const convertChatDate = (chatDate) => {
    let text = "";
    if ((Date.now()-chatDate) < 1000*60*2) {
      text = "Just Now"
    } else if ((Date.now()-chatDate) < 1000*60*60*2) {
      text = `${Math.floor((Date.now()-chatDate)/(1000*60))} minutes ago`; 
    } else if ((Date.now()-chatDate) < 1000*60*60*24*2) {
      text = `${Math.floor((Date.now()-chatDate)/(1000*60*60))} hours ago`;
    } else {
      text = `${Math.floor((Date.now()-chatDate)/(1000*60*60*24))} days ago`;
    }
    return text;
  }

  const scrollToBottomChat = () => {
    document.getElementById('chat-messages').scrollTo({
      top: 9999999999,
      behavior: "smooth",
    });
  }



  return <div>
    <h4 id = "questivians">There {questivians == 1 ? "is" : "are"} {questivians == 0 ? "no other" : `${ (( (new Date()).getHours()) == 18) ? questivians+5 : questivians } fellow`} {questivians == 1 ? "Questivian" : "Questivians"} online. {questivians == 0 ? "It is just you." : ""}</h4>
    <br/>
    
    <Question accountInfo={accountInfo} questionID={questionID} course={course} />

    <div className="smallleaderboard">
      <h2>Top 5</h2>
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
    
    
    <div class="chatroom">
            <div class="chat-header">
                <h2>Chat</h2>
            </div>
            <div class="chat-messages" id="chat-messages">
              <div id = "chat-content" class="chat-content">
                  {chatData.map((item) => (
                    <div class="message user-message" onLoad={scrollToBottomChat()}>
                      <span class="chat-sender">{item.name}:  </span>
                      <span class="chat-time"> ({convertChatDate(parseInt(item.time))}) </span>
                      <span class="chat-message html">{item.content}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div class="chat-input">
                <input type="text" id="message-input" placeholder="Type a message..." />
                <button id="send-button" onClick={(event) => handleSubmitChat(event)}>Send</button>
            </div>
    </div> 


  </div>
};

export default Home;
