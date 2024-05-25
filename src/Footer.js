import React, { useState } from "react";

const Footer = ({ theme, toggleTheme, toggleCourse, course }) => {
  // <button id="course" onClick={toggleCourse}>Switch To Extension {course == "Ext1" ? "2" : "1"}</button>
  
  return (
    <div className={`footer ${theme}`}>
      
      <label className="switch">
        <input type="checkbox" id="theme-switch" onChange={toggleTheme} checked={theme === 'dark'} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default Footer;
