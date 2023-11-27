/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import './App.scss';

function getRandomName(): string {
  return `Clock-${Date.now().toString().slice(-4)}`;
}

export const App: React.FC = () => {
  const [hasClock, setHasClock] = useState(true);
  const [clockName, setClockName] = useState('Clock-0');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const leftClick = () => {
      setHasClock(true);
    };

    const rightClick = (event: MouseEvent) => {
      event.preventDefault();
      setHasClock(false);
    };

    const timerID = window.setInterval(() => {
      setClockName(getRandomName());
    }, 3300);

    const clockTimerID = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    document.addEventListener('click', leftClick);
    document.addEventListener('contextmenu', rightClick);

    return () => {
      document.removeEventListener('click', leftClick);
      document.removeEventListener('contextmenu', rightClick);
      window.clearInterval(timerID);
      window.clearInterval(clockTimerID);
    };
  }, []);

  useEffect(() => {
    console.info(time);
  }, [time]);

  useEffect(() => {
    console.debug(`Renamed to ${clockName}`);
  }, [clockName]);

  return (
    <div className="App">
      <h1>React clock</h1>
      {hasClock && (
        <div className="Clock">
          <strong className="Clock__name">{clockName}</strong>
          {' time is '}
          <span className="Clock__time">
            {time.toUTCString().slice(-12, -4)}
          </span>
        </div>
      )}
    </div>
  );
};
