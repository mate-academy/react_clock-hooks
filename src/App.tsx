import React, { useEffect, useState } from 'react';
import './App.scss';
import { Clock } from './Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [clockname, setClockname] = useState('Clock-0');
  const [hasClock, setHasClock] = useState(false);

  let timerId = 0;

  const leftClickHandler = () => {
    setHasClock(true);
  };

  const rightClickHandler = (event: MouseEvent) => {
    event.preventDefault();

    setHasClock(false);
  };

  useEffect(() => {
    timerId = window.setInterval(() => {
      setClockname(getRandomName());
    }, 3300);

    document.addEventListener('contextmenu', rightClickHandler);
    document.addEventListener('click', leftClickHandler);

    return () => {
      document.removeEventListener('contextmenu', rightClickHandler);
      document.removeEventListener('click', leftClickHandler);
      window.clearInterval(timerId);
    };
  }, []);

  return (
    <div className="App">
      <h1 className="App__title">That is not a clock..</h1>

      {hasClock && (
        <Clock name={clockname} />
      )}
    </div>
  );
};
