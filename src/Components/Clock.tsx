/* eslint-disable no-console */
import { useState, useEffect } from 'react';

type ClockProps = {
  clockName: string;
};

export function Clock({ clockName }: ClockProps) {
  const [time, setTime] = useState(new Date()
    .toUTCString().slice(-12, -4));

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTime(new Date()
        .toUTCString().slice(-12, -4));
      console.info(time);
    }, 1000);

    return () => {
      if (timerId) {
        window.clearInterval(timerId);
      }
    };
  }, []);

  return (
    <div className="Clock">
      <strong className="Clock__name">
        {clockName}
      </strong>

      {' time is '}

      <span className="Clock__time">
        {time}
      </span>
    </div>
  );
}
