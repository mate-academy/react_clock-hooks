import React, { useEffect, useState } from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [hasClock, setHasClock] = useState(true);
  const [clockName, setClockName] = useState('Clock-0');

  const hideClock = (event: MouseEvent) => {
    event.preventDefault();

    setHasClock(false);
  };

  const showClock = () => {
    setHasClock(true);
  };

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setClockName(getRandomName());
    }, 3300);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('contextmenu', hideClock);

    document.addEventListener('click', showClock);

    return () => {
      document.removeEventListener('contextmenu', hideClock);

      document.removeEventListener('click', showClock);
    };
  }, [hasClock]);

  return (
    <div className="App">
      <h1>React clock</h1>

      {hasClock && <Clock clockName={clockName} />}
    </div>
  );
};
