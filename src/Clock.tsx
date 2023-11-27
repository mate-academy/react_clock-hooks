/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';

type Props = {
  name: string;
};

export const Clock: React.FC<Props> = ({ name }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setDate(new Date());
      console.info(date.toUTCString().slice(-12, -4));
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    console.debug(`Renamed from ${name} to ${name}`);
  }, [name]);

  return (
    <div className="Clock">
      <strong className="Clock__name">{name}</strong>

      {' time is '}

      <span className="Clock__time">
        {date.toUTCString().slice(-12, -4)}
      </span>
    </div>
  );
};
