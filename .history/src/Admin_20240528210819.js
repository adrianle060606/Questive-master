import React, {useEffect, useState} from 'react';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./index";
import { getOrdinalHTML, updateRanks, updateOverallPoints, resetAnswered } from './Extra';


const Admin = ({accountInfo}) => {
  

    var adminHTML = <div></div>;
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
        {adminHTML}
    </div>
};

export default Admin;
