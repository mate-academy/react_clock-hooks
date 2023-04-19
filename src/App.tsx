/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from 'react';
import { Clock } from './Clock';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

function usePrevious(value: string) {
  const ref = useRef('clock-0');

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const App: React.FC = () => {
  const [clockName, setClockName] = useState('clock-0');
  const [hasClock, setHasClock] = useState(true);

  let timerId = 0;

  const handleKeyDown = (e: MouseEvent) => {
    e.preventDefault();

    setHasClock(e.button !== 2);
  };

  useEffect(() => {
    window.addEventListener('click', handleKeyDown);
    window.addEventListener('contextmenu', handleKeyDown);
  }, []);

  const prevCount = usePrevious(clockName);

  useEffect(() => {
    timerId = window.setInterval(() => {
      setClockName(getRandomName());

      if (hasClock) {
        console.debug(`Renamed from ${prevCount} to ${clockName}`);
      }
    }, 3300);

    return () => clearInterval(timerId);
  }, [clockName]);

  return (
    <div className="App">
      <h1>React clock</h1>
      {hasClock && <Clock name={clockName} />}
    </div>
  );
};
