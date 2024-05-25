import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    let target = new Date(now);
    target.setHours(8, 30, 0, 0);
    console.log(target.getDay());
    
    
    if (now > target) {
      target.setDate(target.getDate() + 1);
    }

    const timeLeft = target - now;

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = String(Math.floor((timeLeft / (1000 * 60 * 60 * 24)))).padStart(2, '0');
  const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  return (
    <div>
      <p className="notice">Time Until Next Question <br /> {`${hours}:${minutes}:${seconds}`}</p>
    </div>
  );
};

export default CountdownTimer;