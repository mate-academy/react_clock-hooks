import React, { useEffect, useState } from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [clockName, setClockName] = useState('Clock-0');
  const [hasClock, setHasClock] = useState(true);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setClockName(getRandomName());
    }, 3300);

    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();

      setHasClock(false);
    });

    document.addEventListener('click', () => {
      setHasClock(true);
    });

    return () => {
      document.removeEventListener('contextmenu', (event) => {
        event.preventDefault();

        setHasClock(false);
      });

      document.removeEventListener('click', () => {
        setHasClock(true);
      });

      window.clearInterval(timerId);
    };
  }, []);

  return (
    <div className="App">
      <h1>React clock</h1>

      {hasClock
        && <Clock clockName={clockName} />}
    </div>
  );
};
