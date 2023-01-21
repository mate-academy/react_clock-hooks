/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './App.scss';
// import { Clock } from './Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [clockName, setClockName] = useState('Clock-0');
  const [hasClock, setHasClock] = useState(true);
  const [time, setTime] = useState(new Date());

  const onRightClick = (event: MouseEvent) => {
    event.preventDefault();
    setHasClock(false);
  };

  const onClick = () => setHasClock(true);

  useEffect(() => {
    if (hasClock) {
      console.debug(clockName);
    }
  }, [clockName]);

  useEffect(() => {
    if (hasClock) {
      console.info(time.toUTCString().slice(-12, -4));
    }
  }, [time]);

  useEffect(() => {
    document.addEventListener('click', onClick);
    document.addEventListener('contextmenu', onRightClick);

    const nameTimer = window.setInterval(
      () => setClockName(getRandomName()),
      3300,
    );

    const timeTimer = window.setInterval(
      () => setTime(new Date()),
      1000,
    );

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('contextmenu', onRightClick);
      window.clearInterval(nameTimer);
      window.clearInterval(timeTimer);
    };
  }, []);

  return (
    <div className="App">
      <h1>React clock</h1>

      {hasClock && (
        <div className="Clock">
          <strong className="Clock__name">
            {clockName}
          </strong>

          {' time is '}

          <span className="Clock__time">
            {time.toUTCString().slice(-12, -4)}
          </span>
        </div>
      )}
    </div>
  );
};
