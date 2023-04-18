/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { Clock } from './Clock';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [clockName, setTimerName] = useState('Clock-0');
  const [hasClock, setClockOn] = useState(true);
  const [prevClockName, setPrevName] = useState('Clock-0');

  let timerId = 0;

  const detectKeyDown = (e: MouseEvent) => {
    e.preventDefault();

    if (e.button === 2) {
      setClockOn(false);
    } else {
      setClockOn(true);
    }
  };

  useEffect(() => {
    window.addEventListener('click', detectKeyDown);
    window.addEventListener('contextmenu', detectKeyDown);
  });

  useEffect(() => {
    timerId = window.setInterval(() => {
      setPrevName(clockName);
      setTimerName(getRandomName());
    }, 3300);

    return () => clearInterval(timerId);
  }, [clockName]);

  useMemo(() => {
    if (hasClock) {
      console.debug(`Renamed from ${prevClockName} to ${clockName}`);
    }
  }, [clockName]);

  return (
    <div className="App">
      <h1>React clock</h1>
      {hasClock && <Clock name={clockName} />}
    </div>
  );
};
