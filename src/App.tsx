import { FC, useEffect, useState } from 'react';
import './App.scss';
import { Clock } from './components/Clock';

export function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: FC = () => {
  const [hasClock, setHasClock] = useState(true);
  const [clockName, setClockName] = useState('Clock-0');

  const handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    setHasClock(false);
  };

  const handleLeftClick = () => {
    setHasClock(true);
  };

  useEffect(() => {
    const timerClockName = window.setInterval(() => {
      setClockName(getRandomName());
    }, 3300);

    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('click', handleLeftClick);

    return () => {
      window.clearInterval(timerClockName);

      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('click', handleLeftClick);
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
