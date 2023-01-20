import { FC, useEffect, useState } from 'react';

export function getTimeHelper(): string {
  return new Date().toUTCString().slice(-12, -4);
}

type Props = {
  name: string,
};

export const Clock: FC<Props> = ({
  name: clockName,
}) => {
  const [today, setToday] = useState(getTimeHelper());
  const [cachedClockName, setCachedClockName] = useState(clockName);

  useEffect(() => {
    const timerClockSeconds = window.setInterval(() => {
      const now = getTimeHelper();

      // eslint-disable-next-line no-console
      console.info(now);
      setToday(now);
    }, 1000);

    return () => {
      window.clearInterval(timerClockSeconds);
    };
  }, []);

  useEffect(() => {
    if (cachedClockName !== clockName) {
      setCachedClockName(clockName);
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
        {today}
      </span>
    </div>
  );
};
