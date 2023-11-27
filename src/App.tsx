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

  const handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    setHasClock(false);
  };

  const handleLeftClick = () => {
    setHasClock(true);
  };

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setClockName(getRandomName());
    }, 3300);

    window.addEventListener('contextmenu', handleRightClick);
    window.addEventListener('click', handleLeftClick);

    return () => {
      window.clearInterval(timerId);

      window.removeEventListener('contextmenu', handleRightClick);
      window.removeEventListener('click', handleLeftClick);
    };
  }, []);

  return (
    <div className="App">
      <h1>React clock</h1>

      {hasClock && (<Clock name={clockName} />)}
    </div>
  );
};
