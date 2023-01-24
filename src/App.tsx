/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './App.scss';
import { Clock } from './Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [hasClock, setHasClock] = useState(true);
  const [clockName, setClockName] = useState('Clock-0');

  const handleRightClick = () => (
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      setHasClock(false);
    }));

  const handleLeftClick = () => (
    document.addEventListener('click', () => {
      setHasClock(true);
    })
  );

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setClockName(getRandomName());
    }, 3300);

    handleRightClick();
    handleLeftClick();

    return () => {
      window.clearInterval(timerId);
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('click', handleLeftClick);
    };
  }, [hasClock, clockName]);

  return (
    <div className="App">
      <h1>React clock</h1>
      {hasClock && (
        <Clock clockName={clockName} />
      )}
    </div>
  );
};
