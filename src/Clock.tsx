import React, { useEffect, useState } from 'react';

interface Props {
  clockName: string;
}

export const Clock: React.FC<Props> = ({ clockName }) => {
  const [time, setTime] = useState(new Date());
  const [prevName, setPrevName] = useState(clockName);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTime(new Date());
      // eslint-disable-next-line no-console
      console.info(new Date().toUTCString().slice(-12, -4));
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (prevName !== clockName) {
      // eslint-disable-next-line no-console
      console.debug(`Renamed to ${clockName}`);
      setPrevName(clockName);
    }
  }, [clockName]);

  return (
    <div className="Clock">
      <strong className="Clock__name">
        {clockName}
      </strong>

      <span>{' time is '}</span>

      <span className="Clock__time">
        {time.toUTCString().slice(-12, -4)}
      </span>
    </div>
  );
};
