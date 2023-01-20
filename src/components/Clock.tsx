import { FC, useEffect, useState } from 'react';

type Props = {
  clockName: string;
};

export const Clock: FC<Props> = ({ clockName }) => {
  const [time, setTime] = useState(new Date());
  const [prevClockName, setPrevClockName] = useState(clockName);

  const formatedTime = time.toUTCString().slice(-12, -4);

  useEffect(() => {
    const clockTimer = window.setInterval(() => {
      setTime(new Date());
      // eslint-disable-next-line
      console.info(new Date().toUTCString().slice(-12, -4));
    }, 1000);

    return () => {
      window.clearInterval(clockTimer);
    };
  }, []);

  useEffect(() => {
    if (prevClockName !== clockName) {
      // eslint-disable-next-line
      console.debug(`Renamed to ${clockName}`);

      setPrevClockName(clockName);
    }
  }, [clockName]);

  return (
    <div className="Clock">
      <strong className="Clock__name">{clockName}</strong>

      {' time is '}

      <span className="Clock__time">{formatedTime}</span>
    </div>
  );
};
