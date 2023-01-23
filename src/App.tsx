import React, { useEffect, useState } from 'react';
import './App.scss';
import { Clock } from './Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [clockName, setClockName] = useState('Clock-0');
  const [visibleclock, setVisibleClock] = useState(true);

  const handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    setVisibleClock(false);
  };

  const handleLeftClick = () => {
    setVisibleClock(true);
  };

  useEffect(() => {
    document.addEventListener('click', handleLeftClick);
    document.addEventListener('contextmenu', handleRightClick);

    const timerId = window.setInterval(() => {
      setClockName(getRandomName());
    }, 3300);

    return () => {
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleRightClick);

      window.clearInterval(timerId);
    };
  }, []);

  return (
    <div className="App">
      <h1>React clock</h1>
      {visibleclock && (
        <Clock clockName={clockName} />
      )}

    </div>
  );
};
