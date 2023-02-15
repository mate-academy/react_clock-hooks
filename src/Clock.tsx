import React, { useState, useEffect } from "react";

type Props = {
  clockName: string;
};

export const Clock: React.FC<Props> = ({ clockName }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [previousClockName, setPreviousClockName] = useState(clockName);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentTime(new Date());
      // eslint-disable-next-line no-console
      console.info(new Date().toUTCString().slice(-12, -4));
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (previousClockName !== clockName) {
      // eslint-disable-next-line no-console
      console.debug(`Renamed to ${clockName}`);
      setPreviousClockName(clockName);
    }
  }, [clockName]);

  return (
    <div className="Clock">
      <strong className="Clock__name">{clockName}</strong>

      {" time is "}

      <span className="Clock__time">
        {currentTime.toUTCString().slice(-12, -4)}
      </span>
    </div>
  );
};
