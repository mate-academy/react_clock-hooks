import React, { useEffect, useState } from 'react';

type Props = {
  clockName: string;
};

export const Clock: React.FC<Props> = ({ clockName }) => {
  const [time, setTime] = useState(new Date());
  const [prevClockName, setPrevClockName] = useState(clockName);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      const newtime = new Date();

      // eslint-disable-next-line no-console
      console.info(newtime.toUTCString().slice(-12, -4));

      setTime(newtime);
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    }
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
        {time.toUTCString().slice(-12, -4)}
      </span>
    </div>
  );
};
