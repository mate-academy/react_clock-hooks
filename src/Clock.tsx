import { useState, useEffect } from 'react';

type Props = {
  name: string;
};

export const Clock: React.FC<Props> = ({ name }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      const newTime = new Date();
      // eslint-disable-next-line
      console.info(newTime.toUTCString().slice(-12, -4));

      setTime(newTime);
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  return (
    <div className="Clock">
      <strong className="Clock__name">{name}</strong>

      {' time is '}

      <span className="Clock__time">{time.toUTCString().slice(-12, -4)}</span>
    </div>
  );
};
