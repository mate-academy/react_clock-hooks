import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

interface AppState {
  clockName: string;
  hasClock: boolean;
}

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    clockName: 'Clock-0',
    hasClock: true,
  };

  componentDidMount() {
    document.addEventListener('click', this.globalHandleLeftClick);
    document.addEventListener('contextmenu', this.globalHandleRightClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.globalHandleLeftClick);
    document.removeEventListener('contextmenu', this.globalHandleRightClick);
  }

  toggleClockVisibility = () => {
    this.setState((prevState) => ({ hasClock: !prevState.hasClock }));
  };

  globalHandleLeftClick = (event: MouseEvent) => {
    event.preventDefault();
    if (!this.state.hasClock) {
      this.toggleClockVisibility();
    }
  };

  globalHandleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    if (this.state.hasClock) {
      this.toggleClockVisibility();
    }
  };

  render() {
    const { hasClock, clockName } = this.state;

    return (
      <div className="App">
        {hasClock
        && (
          <Clock
            name={clockName}
            hasClock={hasClock}
          />
        )}
      </div>
    );
  }
}
