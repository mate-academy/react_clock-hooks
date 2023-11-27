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
  const [timerId, setTimerId] = useState(0);

  const contectmenuHandler = (event: MouseEvent) => {
    event.preventDefault();
    setHasClock(false);
  };

  const clickHandler = () => {
    setHasClock(true);
  };

  useEffect(() => {
    document.addEventListener('contextmenu', contectmenuHandler);

    document.addEventListener('click', clickHandler);

    setTimerId(window.setInterval(() => {
      setClockName(getRandomName());
    }, 3300));

    return () => {
      window.clearInterval(timerId);
      document.removeEventListener('contextmenu', contectmenuHandler);
      document.removeEventListener('click', clickHandler);
    };
  }, []);

  return (
    <div className="App">
      <h1>React clock</h1>

      {hasClock && <Clock clockName={clockName} />}
    </div>
  );
};
