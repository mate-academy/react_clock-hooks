import React, { useEffect, useState } from 'react';
import './App.scss';
import { Clock } from './components/clock/Colck';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [clockName, setColckName] = useState('Clock-0');
  const [isClockVisible, setIsClockVisible] = useState(true);

  useEffect(() => {
    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();
      setIsClockVisible(false);
    });

    document.addEventListener('click', () => {
      setIsClockVisible(true);
    });

    const timerId = window.setInterval(() => {
      setColckName(getRandomName());
    }, 3300);

    return () => {
      window.clearInterval(timerId);
      document.removeEventListener('contextmenu', (event: MouseEvent) => {
        event.preventDefault();
        setIsClockVisible(false);
      });

      document.removeEventListener('click', () => {
        setIsClockVisible(true);
      });
    };
  }, []);

  return (
    <div className="App">
      <h1>React clock</h1>
      {isClockVisible && (
        <Clock clockName={clockName} />
      )}
    </div>
  );
};
