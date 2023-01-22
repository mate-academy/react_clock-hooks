import React, { useEffect, useState } from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const today = new Date();
  const [clockName, setClockName] = useState('Clock-0');
  const [time, setTime] = useState(today);
  const [showClock, setShowClock] = useState(true);

  const timerId = window.setInterval(() => {
    setClockName(getRandomName);
  }, 3300);

  window.clearInterval(timerId);

  useEffect(() => {
    window.setInterval(() => {
      setClockName(getRandomName);
    }, 3300);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    window.setInterval(() => {
      setTime(new Date());
      const newTime = new Date();

      // eslint-disable-next-line no-console
      console.info(newTime.toUTCString().slice(-12, -4));
    }, 1000);
  }, []);
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // not to show the context menu

    setShowClock(false);
  });

  document.addEventListener('click', () => {
    setShowClock(true);
  });

  return (
    <div className="App">
      <h1>React clock</h1>
      {showClock && (
        <div className="Clock">
          <strong className="Clock__name">
            {clockName}
          </strong>

          {' time is '}

          <span className="Clock__time">
            {time.toUTCString().slice(-12, -4)}
          </span>
        </div>

      )}
    </div>
  );
};
