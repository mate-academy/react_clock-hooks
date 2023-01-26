/* eslint-disable no-console */
import { useEffect, useState } from 'react';

export const Clock: React.FC<{ name: string }> = ({ name }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      const newTime = new Date();

      setTime(newTime);
      console.info(newTime.toUTCString().slice(-12, -4));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  return (
    <div className="Clock">
      <strong className="Clock__name">
        {name}
      </strong>

      {' time is '}

      <span className="Clock__time">
        {time.toUTCString().slice(-12, -4)}
      </span>
    </div>
  );
};
