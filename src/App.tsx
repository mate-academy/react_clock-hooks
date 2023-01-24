/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './App.scss';
import { Clock } from './Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const initialClockName = 'Clock-0';
  const [clockName, setClockName] = useState(initialClockName);
  const [hasClock, setHasClock] = useState(true);

  const onRightClick = (event: MouseEvent) => {
    event.preventDefault();
    setHasClock(false);
  };

  const onClick = () => setHasClock(true);

  useEffect(() => {
    if (hasClock && clockName !== initialClockName) {
      console.debug(`Renamed to ${clockName}`);
    }
  }, [clockName]);

  useEffect(() => {
    document.addEventListener('click', onClick);
    document.addEventListener('contextmenu', onRightClick);

    const timerId = window.setInterval(
      () => setClockName(getRandomName()),
      3300,
    );

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('contextmenu', onRightClick);
      window.clearInterval(timerId);
    };
  }, []);

  return (
    <div className="App">
      <h1>React clock</h1>

      {hasClock && (
        <Clock name={clockName} />
      )}
    </div>
  );
};
