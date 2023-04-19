/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

type Props = {
  name: string;
};

export const Clock: React.FC<Props> = ({ name }) => {
  const [clockState, setClockState] = useState(Date.now().toString().slice(-4));

  let timerId = 0;

  useEffect(() => {
    timerId = window.setInterval(() => {
      const date = new Date();

      setClockState(date.toLocaleTimeString());
    }, 1000);

    console.info(clockState);

    return () => clearInterval(timerId);
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
