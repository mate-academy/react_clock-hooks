import React, { useEffect, useState } from 'react';

interface Props {
  clockName: string,
}

export const Clock: React.FC<Props> = ({ clockName }) => {
  const todayTime = new Date().toUTCString().slice(-12, -4);
  const [timeString, setTimeString] = useState(todayTime);

  useEffect(() => {
    const timerSec = window.setInterval(() => {
      const todayTimeCount = new Date().toUTCString().slice(-12, -4);

      // eslint-disable-next-line no-console
      console.info(todayTimeCount);

      setTimeString(todayTimeCount);
    }, 1000);

    return () => {
      window.clearInterval(timerSec);
    };
  }, []);

  useEffect(() => {
    if (clockName !== 'Clock-0') {
      // eslint-disable-next-line no-console
      console.debug(`Renamed to ${clockName}`);
    }
  }, [clockName]);

  return (
    <div className="Clock">
      <strong className="Clock__name">
        {clockName}
      </strong>

      {' time is '}

      <span className="Clock__time">
        {timeString}
      </span>
    </div>
  );
};
