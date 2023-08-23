/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';

interface ClockProps {
  name: string;
  hasClock: boolean;
}

export const Clock: React.FC<ClockProps>
= ({
  name,
  hasClock,
}) => {
  const today = new Date().toUTCString().slice(-12, -4);

  const [currentTime, setCurrentTime] = useState(today);
  const [clockName, setClockName] = useState<string>(name);

  const getRandomName = () => {
    const value = Date.now().toString().slice(-4);

    return `Clock-${value}`;
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setClockName(getRandomName());
    }, 3300);

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toUTCString().slice(-12, -4));
    }, 1000);

    return () => {
      clearInterval(timerId);
      clearInterval(timeInterval);
    };
  }, []);

  useEffect(() => {
    if (hasClock) {
      console.info(currentTime);
    }
  }, [currentTime, hasClock]);

  useEffect(() => {
    if (hasClock) {
      console.debug(`Clock name changed to ${clockName}`);
    }
  }, [clockName, hasClock]);

  return (
    <>
      <h1>React clock</h1>
      {hasClock && (
        <div className="Clock">
          <strong className="Clock__name">
            {clockName}
          </strong>
          {' time is '}
          <span className="Clock__time">
            {currentTime}
          </span>
        </div>
      )}
    </>
  );
};
