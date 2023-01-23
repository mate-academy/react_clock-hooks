import { useState, useEffect } from 'react';
import './App.scss';
import { Clock } from './Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [name, setName] = useState('Clock-0');
  const [hasClock, setHasClock] = useState(true);

  const handleRightClick = (event: MouseEvent) => {
    setHasClock(false);
    event.preventDefault();
  };

  const handleLeftClick = (event: MouseEvent) => {
    setHasClock(true);
    event.preventDefault();
  };

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setName(getRandomName());
    }, 3300);

    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('click', handleLeftClick);

    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('click', handleLeftClick);

      window.clearInterval(timerId);
    };
  }, []);

  return (
    <div className="App">
      <h1>React clock</h1>
      {hasClock && (
        <Clock name={name} />
      )}
    </div>
  );
};
