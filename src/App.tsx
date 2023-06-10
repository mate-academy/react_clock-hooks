import React, { useState, useEffect } from 'react';
import './App.scss';
import { Clock } from './Components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [clockName, setClockName] = useState('Clock-0');
  const [hasClock, setHasClock] = useState(true);

  function hideClock(event: MouseEvent) {
    event.preventDefault();
    setHasClock(false);
  }

  function showClock() {
    setHasClock(true);
  }

  useEffect(() => {
  // This code starts a timer
    const clockNameTimerId = window.setInterval(() => {
      setClockName(getRandomName());
    }, 3300);

    document.addEventListener('contextmenu', hideClock);
    document.addEventListener('click', showClock);

    return () => {
      if (clockNameTimerId) {
        window.clearInterval(clockNameTimerId);
      }

      document.removeEventListener('contextmenu', hideClock);
      document.removeEventListener('click', showClock);
    };
  }, []);

  return (
    <div className="App">
      { hasClock && (
        <>
          <h1>React clock</h1>
          <Clock clockName={clockName} />
        </>
      )}
    </div>
  );
};
