/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

type Props = {
  clockName: string;
};

const Clock: React.FC<Props> = ({ clockName }) => {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const passTimeId = setInterval(() => {
      setToday(new Date(today.setSeconds(today.getSeconds() + 1)));
      console.info(today.toUTCString().slice(-12, -4));
    }, 1000);

    return () => {
      window.clearInterval(passTimeId);
    };
  }, []);

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

export default Clock;
