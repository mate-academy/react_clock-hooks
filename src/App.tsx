import React, { useEffect, useState } from 'react';
import './App.scss';
import { Clock } from './components/Clock';

export const App: React.FC = () => {
  const [hasClock, setHasClock] = useState(true);

  const handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    setHasClock(false);
  };

  const handleLeftClick = () => {
    setHasClock(true);
  };

  useEffect(() => {
    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('click', handleLeftClick);

    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('click', handleLeftClick);
    };
  }, []);

  return (
    <div className="App">
      <h1>React clock</h1>
      {hasClock && (
        <Clock />
      )}
    </div>
  );
};
