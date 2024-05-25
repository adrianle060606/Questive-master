import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    let target = new Date(now);
    target.setHours(8, 30, 0, 0);
    target.getDay(); // sunday = 0, monday = 1 etc...
    let daysLeft = (target.getDay()) % 7
    if (daysLeft == 0) {
      if (target.getHours() >= 8 && (target.getHours() != 8 || target.getMinutes > 30)) {
        daysLeft = 6;
      }
    }

    const timeLeft = daysLeft*24*60*60*1000 + target - now;

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = String(((timeLeft / (1000 * 60 * 60 * 24)))).padStart(2, '0');
  const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  return (
    <div>
      <p className="notice">Time Until Next Question <br /> {`${days}:${hours}:${minutes}:${seconds}`}</p>
    </div>
  );
};

export default CountdownTimer;