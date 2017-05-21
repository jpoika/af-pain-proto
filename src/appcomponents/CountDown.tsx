import * as React from "react";

export interface Props{
  deadline: number;
  onComplete(): void;
}

export interface State {
  minutesDisplay: string|number;
  secondsDisplay: string|number;
}


export default class CountDown extends React.Component<Props, State>{
  public interval: any;
  public deadlineDate: Date;

  constructor(props){
    super(props);
    this.deadlineDate = new Date(props.deadline);
    const data = this.calculateCountdown();
    this.state = {
      minutesDisplay: data[1],
      secondsDisplay: data[0]
    };
  }

  calculateCountdown = () => {
    const now = new Date();
    let msDiff = this.deadlineDate.getTime() - now.getTime();
    msDiff = msDiff < 0 ? 0 : msDiff;
    const secondsCountdown = Math.floor(msDiff / 1000);
    const minutesCountdown = Math.floor(secondsCountdown / 60);

    const minutesHour = minutesCountdown % 60;
    const secondsHour = secondsCountdown % 60;

    if(msDiff <= 0){
      this.handleTimeout();
    }

    return [secondsHour, minutesHour];
  }

  handleTick = () => {
    const data = this.calculateCountdown();
    console.log(data);
    this.setState({ 
      minutesDisplay: data[1],
      secondsDisplay: data[0]
    });
  }
  handleTimeout = () => {
    const {onComplete} = this.props;
    clearInterval(this.interval);
    console.log('handle Timeout called');
    onComplete();
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  componentDidMount(){
    this.handleTick();
    this.interval = setInterval(this.handleTick, 1000);
  }

  render(){
    const {minutesDisplay, secondsDisplay} = this.state;
    return <h1>{minutesDisplay} Minutes and {secondsDisplay} Seconds</h1>;
  }
}







