/* eslint-disable no-console */
import React, { useEffect, useState, useMemo } from 'react';

type Props = {
  name: string;
};

export const Clock: React.FC<Props> = ({ name }) => {
  const [clockState, setClockState] = useState('');

  let timerId = 0;

  useEffect(() => {
    timerId = window.setInterval(() => {
      const date = new Date();

      setClockState(date.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timerId);
  }, [clockState]);

  useMemo(() => {
    console.info(clockState);
  }, [clockState]);

  return (
    <div className="Clock">
      <strong className="Clock__name">
        {name}
      </strong>

      {' time is '}

      <span className="Clock__time">
        {clockState}
      </span>
    </div>
  );
};
