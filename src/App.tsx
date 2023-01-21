/* eslint-disable no-console */
import React from 'react';
import Clock from './Clock';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export class App extends React.Component {
  state = {
    clockName: 'Clock-0',
    hasClock: true,
    timerId: -1,
  };

  componentDidMount() {
    this.setState(() => {
      const timerId = window.setInterval(() => {
        this.setState({ clockName: getRandomName() });
        if (this.state.hasClock) {
          console.debug(`Renamed to ${this.state.clockName}`);
        }
      }, 3300);

      return timerId;
    });

    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      this.handleRightClick();
    });

    document.addEventListener('click', () => {
      this.handleLeftClick();
    });
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this.handleLeftClick);
    document.removeEventListener('contextmenu', this.handleRightClick);
    clearInterval(this.state.timerId);
  }

  handleLeftClick() {
    this.setState({ hasClock: true });
  }

  handleRightClick() {
    this.setState({ hasClock: false });
  }

  render() {
    const { clockName, hasClock } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        { hasClock && <Clock clockName={clockName} />}
      </div>
    );
  }
}
