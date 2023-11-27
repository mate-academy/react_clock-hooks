import { useEffect, useState } from 'react';

export const Clock: React.FC<{ name: string }> = ({ name }) => {
  const now = () => new Date().toUTCString().slice(-12, -4);
  const [time, setTime] = useState(now);
  const [prevClockName, setPrevClockName] = useState(name);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(now);

      /* eslint-disable no-console */
      console.info(now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (prevClockName !== name) {
      /* eslint-disable no-console */
      console.debug(`Renamed to ${name}`);
      setPrevClockName(name);
    }
  }, [name]);

  return (
    <div className="Clock">
      <strong className="Clock__name">{name}</strong>

      {' time is '}

      <span className="Clock__time">{time}</span>
    </div>
  );
};
