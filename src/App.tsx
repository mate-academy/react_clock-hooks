import React, { useEffect, useState } from 'react';
import './App.scss';
import { Clock } from './Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [clockName, setClockName] = useState('Clock-0');
  const [hasClock, setHasClock] = useState(true);

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // not to show the context menu
    setHasClock(false);
  });

  document.addEventListener('click', (event) => {
    event.preventDefault();
    setHasClock(true);
  });

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setClockName(getRandomName());
    }, 3300);

    return () => window.clearInterval(timerId);
  });

  return (
    <div className="App">
      <h1>React clock</h1>
      {hasClock && (
        <Clock
          clockName={clockName}
        />
      )}
    </div>
  );
};
