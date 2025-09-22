import React, { useState, useEffect } from "react";
import styles from './TaskDisplay.module.scss'

const Timer = ({ task: {deadline,status} }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(deadline));

  useEffect(() => {
    if(status==='done') return;
    const timer = setInterval(() => {
        const remaining = getTimeLeft(deadline)
      setTimeLeft(remaining);

      if(!remaining) clearInterval(timer)
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline,status]);

  if (!timeLeft && status !== 'done') {
    return <span className={styles.timeLeft}>Время вышло</span>;
  }

  return (
    status != 'done' && <span className={styles.timer}>
      {timeLeft?.days > 0 && `${timeLeft.days}д `}
      {timeLeft?.hours > 0 && `${timeLeft.hours}ч `}
      {timeLeft?.minutes > 0 && `${timeLeft.minutes}м `}
      {timeLeft?.seconds >= 0 && `${timeLeft.seconds}с`}
    </span>
  );
};

function getTimeLeft(deadline) {
  const now = new Date();
  const diff = new Date(deadline) - now;

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default Timer;
