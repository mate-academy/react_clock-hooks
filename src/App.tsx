import React from 'react';
import { Clock } from './Clock';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  hasClock: boolean,
  clockName: string,
};

export class App extends React.Component<{}, State> {
  state = {
    hasClock: true,
    clockName: 'Clock-0',
  };

  timer: number | undefined;

  componentDidMount(): void {
    document.addEventListener('click', this.addClock);
    document.addEventListener('contextmenu', this.hideClock);

    this.timer = window.setInterval(this.timerId, 3300);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer);
    document.removeEventListener('click', this.addClock);
    document.removeEventListener('contextmenu', this.hideClock);
  }

  addClock = () => {
    this.setState({ hasClock: true });
  };

  hideClock = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  timerId = () => {
    this.setState({ clockName: getRandomName() });
  };

  render() {
    const { hasClock, clockName } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>
        {hasClock && <Clock clockName={clockName} />}
      </div>
    );
  }
}
