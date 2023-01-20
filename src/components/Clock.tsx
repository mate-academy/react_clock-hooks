import React, { useEffect, useState } from 'react';

export function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export function getTime(): string {
  return new Date().toUTCString().slice(-12, -4);
}

export const Clock: React.FC = () => {
  const [today, setToday] = useState(getTime());
  let clockName = 'Clock-0';

  // useEffect(() => {
  //   window.setInterval(() => {
  //     setToday(() => {
  //       const now = getTime();

  //       // eslint-disable-next-line no-console
  //       console.info(now);

  //       return now;
  //     });
  //   }, 1000);
  // }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = getTime();

      // eslint-disable-next-line no-console
      console.info(now);
      setToday(now);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  // This code starts a timer
  const timerId = window.setInterval(() => {
    clockName = getRandomName();
  }, 3300);

  // this code stops the timer
  window.clearInterval(timerId);

  return (
    <div className="Clock">
      <strong className="Clock__name">
        {clockName}
      </strong>

      {' time is '}

      <span className="Clock__time">
        {today}
      </span>
    </div>
  );
};
