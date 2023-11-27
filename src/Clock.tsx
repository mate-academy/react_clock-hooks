import React, { useEffect, useState } from 'react';

interface Props {
  name: string,
}

export const Clock: React.FC<Props> = ({ name }) => {
  const [today, setToday] = useState(new Date());
  const [cName, setCName] = useState(name);

  useEffect(() => {
    const date = window.setInterval(() => {
      setToday(new Date());
      // eslint-disable-next-line no-console
      console.info(new Date().toUTCString().slice(-12, -4));
    }, 1000);

    return () => {
      window.clearInterval(date);
    };
  }, []);

  useEffect(() => {
    if (name !== cName) {
      // eslint-disable-next-line no-console
      console.debug(`Renamed to ${name}`);
      setCName(name);
    }
  }, [name]);

  return (
    <div className="Clock">
      <strong className="Clock__name">
        {name}
      </strong>

      {' time is '}

      <span className="Clock__time">
        {today.toUTCString().slice(-12, -4)}
      </span>
    </div>
  );
};
