import React, { useEffect, useRef, useState } from 'react';

type Props = {
  clockName: string;
};

export const Clock: React.FC<Props> = (props) => {
  const [time, setTime] = useState(new Date());
  const prevProps = useRef(props);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);
    const { clockName } = props;

    if (clockName !== prevProps.current.clockName) {
      // eslint-disable-next-line no-console
      console.debug(`Renamed from ${prevProps.current.clockName} to ${clockName}`);
      prevProps.current = props;
    }

    return () => window.clearInterval(timerId);
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
