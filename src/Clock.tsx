import React, { useEffect, useState } from 'react';

type Props = {
  clockName: string,
};

export const Clock: React.FC<Props> = ({ clockName }) => {
  const [today, setToday] = useState(new Date());
  const [prevClockName, setPrevClockName] = useState(clockName);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setToday(new Date());
      // eslint-disable-next-line no-console
      console.info(new Date().toUTCString().slice(-12, -4));
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (prevClockName !== clockName) {
      // eslint-disable-next-line no-console
      console.debug(`Renamed to ${clockName}`);
      setPrevClockName(clockName);
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
