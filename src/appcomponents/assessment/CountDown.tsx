import * as React from "react";

export interface Props{
  deadline: number;
  onComplete?(): void;
  mode?: string;
  isReady: boolean;
}

export interface State {
  minutesDisplay: string|number;
  secondsDisplay: string|number;
  hoursDisplay: string|number;
  mode: string;
}


export default class CountDown extends React.Component<Props, State>{
  public interval: any;
  public deadlineDate: Date;

  static defaultProps: Partial<Props> = {
    mode: 'default',
    onComplete: () => {}
  }

  constructor(props){
    super(props);
    this.deadlineDate = new Date(props.deadline);
    const data = this.calculateCountdown();
    this.state = {
      minutesDisplay: data[1],
      secondsDisplay: data[0],
      hoursDisplay: data[2],
      mode: props.mode
    };
  }

  calculateCountdown = () => {
    const now = new Date();
    let msDiff = this.deadlineDate.getTime() - now.getTime();
    msDiff = msDiff < 0 ? 0 : msDiff;
    const secondsCountdown = Math.floor(msDiff / 1000);
    const minutesCountdown = Math.floor(secondsCountdown / 60);
    const hoursCountdown = Math.floor(minutesCountdown / 60);

    const minutesHour = minutesCountdown % 60;
    const secondsHour = secondsCountdown % 60;

    if(msDiff <= 0){
      this.handleTimeout();
    }

    return [secondsHour, minutesHour,hoursCountdown];
  }

  handleTick = () => {
    const data = this.calculateCountdown();
    this.setState({ 
      minutesDisplay: data[1],
      secondsDisplay: data[0],
      hoursDisplay: data[2]
    });
  }
  handleTimeout = () => {
    const {onComplete} = this.props;
    clearInterval(this.interval);

    onComplete();
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  componentDidMount(){
    this.handleTick();
    this.interval = setInterval(this.handleTick, 1000);
  }

  zeroFill = (num: string|number, spaces: number = 2) => {
    const num_string = num.toString();
    const str_len = num_string .length;
    let zfill = spaces - str_len;
    if(zfill < 0){
      zfill = str_len;
    }
    return "0".repeat(zfill) + num_string;
  }

  render(){
    const {minutesDisplay, secondsDisplay, hoursDisplay} = this.state;
    if(this.state.mode === 'compact'){
      return <span>{this.zeroFill(hoursDisplay)}:{this.zeroFill(minutesDisplay)}:{this.zeroFill(secondsDisplay)}</span>
    } else {
      const hoursString = hoursDisplay < 1 ? "" :  hoursDisplay + " " + (hoursDisplay == 1 ? 'hour' : 'hours');
      return <h1>{hoursString} {minutesDisplay} Minutes and {secondsDisplay} Seconds</h1>;
    }
  }
}