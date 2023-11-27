import React, { useEffect, useState } from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [showClock, setShowClock] = useState(true);
  const [clockName, setClockName] = useState('Clock-0');

  const handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    setShowClock(false);
  };

  const handleLeftClick = () => {
    setShowClock(true);
  };

  useEffect(() => {
    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('click', handleLeftClick);

    const timerId = window.setInterval(() => {
      setClockName(getRandomName());
    }, 3300);

    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('click', handleLeftClick);

      window.clearInterval(timerId);
    };
  }, []);

  return (
    <div className="App">
      <h1>React clock</h1>

      {showClock && <Clock name={clockName} />}
    </div>
  );
};
