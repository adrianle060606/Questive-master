import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDIucgkS1SxJhz7dIVniWJ6G0V3liaWa_A",
    authDomain: "questive-e0224.firebaseapp.com",
    projectId: "questive-e0224",
    storageBucket: "questive-e0224.appspot.com",
    messagingSenderId: "110568993367",
    appId: "1:110568993367:web:03f9809896a745007ba912",
    measurementId: "G-PBLPZ20LCF"
};

const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const db = getFirestore(app);

export { db };
