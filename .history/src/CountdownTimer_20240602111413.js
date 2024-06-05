import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    let target = new Date(now);
    target.setHours(18, 30, 0, 0);

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

  const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24));
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60));
  const seconds = String(Math.floor((timeLeft / 1000) % 60));

  return (
    <div>
      <p className="notice">Time Until Next Question <br /> {`${hours}:${minutes}:${seconds}`}</p>
    </div>
  );
};

export default CountdownTimer;