/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

type Props = {
  clockName: string,
};

export const Clock: React.FC<Props> = ({ clockName }) => {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setToday(new Date());
      console.info(today.toUTCString().slice(-12, -4));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [today]);

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
