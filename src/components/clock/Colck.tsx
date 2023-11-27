import React, { useEffect, useRef, useState } from 'react';

type Props = {
  clockName: string;
};

export const Clock: React.FC<Props> = (props) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      const today = new Date();

      setTime(today);
      // eslint-disable-next-line no-console
      console.info(today.toUTCString().slice(-12, -4));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  const prevProps = useRef(props);

  useEffect(() => {
    const { clockName } = props;

    if (clockName !== prevProps.current.clockName) {
      // eslint-disable-next-line no-console
      console.debug(`Renamed to ${clockName}`);
      prevProps.current = props;
    }
  }, [props.clockName]);

  return (
    <div className="Clock">
      <strong className="Clock__name">
        {props.clockName}
      </strong>

      {' time is '}

      <span className="Clock__time">
        {time.toUTCString().slice(-12, -4)}
      </span>
    </div>
  );
};
