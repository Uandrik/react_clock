import React from 'react';
type State = {
  today: Date;
  clockName: string;
};

type Props = {
  clockName: string;
};

export class Clock extends React.Component<Props, State> {
  state: Readonly<State> = {
    today: new Date(),
    clockName: this.props.clockName,
  };

  timerId = 0;

  componentDidMount(): void {
    this.timerId = window.setInterval(() => {
      const newDate = new Date();

      this.setState({ today: new Date() });
      // eslint-disable-next-line no-console
      console.log(newDate.toLocaleTimeString());
    }, 1000);
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.clockName !== this.props.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevProps.clockName} to ${this.props.clockName}`,
      );
    }
  }

  componentWillUnmount(): void {
    window.clearInterval(this.timerId);
  }

  render() {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.clockName}</strong>

        {' time is '}

        <span className="Clock__time">
          {this.state.today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
