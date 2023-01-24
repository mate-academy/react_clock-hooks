/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

type ClockProps = {
  clockName: string,
};

export const Clock: React.FC<ClockProps> = ({ clockName }) => {
  const [today, setToday] = useState(new Date());
  const [prevClockName, setNewClockName] = useState(clockName);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setToday(new Date());
      console.info(today.toUTCString().slice(-12, -4));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [today]);

  useEffect(() => {
    if (clockName !== prevClockName) {
      console.info(`Renamed from ${prevClockName} to ${clockName}`);
      setNewClockName(clockName);
    }
  }, [clockName]);

  return (
    <div className="Clock">
      <strong className="Clock__name">
        {clockName}
      </strong>

      {' time is '}

      <span className="Clock__time">
        {today.toUTCString().slice(-12, -4)}
      </span>
    </div>
  );
};
