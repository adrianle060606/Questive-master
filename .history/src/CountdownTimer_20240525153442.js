import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    let target = new Date(now);
    target.setHours(8, 30, 0, 0);
    target.getDay(); // sunday = 0, monday = 1 etc...
    let daysLeft = (8-now.getDay()) % 7
    if (daysLeft == 0) {
      if (now.getHours() >= 8 && (now.getHours() != 8 || now.getMinutes() > 30)) {
        daysLeft = 7;
      }
    }

    const timeLeft = daysLeft*24*60*60*1000 + (target - now);

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  console.log(timeLeft)
  const days = String(Math.floor((timeLeft / (1000 * 60 * 60 * 24))));
  const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24));
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60));
  const seconds = String(Math.floor((timeLeft / 1000) % 60));

  return (
    <div>
      <p className="notice">Time Until Next Question <br /> {`${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`}</p>
    </div>
  );
};

export default CountdownTimer;