import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton';
const audioChimeLink = require('../res/audio/alert_chime.mp3');
export interface Props{
  clearAlert(): any;
  alerting: boolean;
}
export interface State{
  alerting: boolean;
  screenColor: string;
  textColor: string;
  flashScreenIvalId: number;
  soundAlertIvalId: number;
}

var styles = {
   centerMessage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}
export default class AlertScreen extends React.Component<Props, State>{
  constructor(props){
    super(props);
    this.state = {
      alerting: this.props.alerting,
      screenColor: 'red',
      textColor: 'white',
      flashScreenIvalId: 0,
      soundAlertIvalId: 0
    }
    if(this.props.alerting){
      this.soundAlert();
    }

  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.alerting){
      this.startSignaler();
    }
    this.setState({
      alerting: nextProps.alerting
    })
  }
  componentDidMount(){
    if(this.state.alerting){
      this.startSignaler();
    }
  }

  soundAlert = () => {
      var snd = new Audio(audioChimeLink); // buffers automatically when created
      snd.play();
  }

  componentWillUnmount(){
    this.stopSignaler(); 
  }
  startSignaler = () => {
    console.log("Starting signaler");
    this.stopSignaler();
    let fintId = window.setInterval(() => {
      this.setState({
        screenColor: this.state.screenColor === 'red' ? 'white' : 'red',
        textColor: this.state.textColor === 'red' ? 'white' : 'red'
      })
    },1000);
    
    let sintId = window.setInterval(() => {
        this.soundAlert();
    },10000);

    this.setState({
      flashScreenIvalId: fintId,
      soundAlertIvalId: sintId
    })

  }
  stopSignaler = () => {

    this.setState({
      screenColor: 'white',
      textColor: 'red',
      alerting: false
    });

    if(this.state.flashScreenIvalId){
      clearInterval(this.state.flashScreenIvalId);
    }
    if(this.state.soundAlertIvalId){
      clearInterval(this.state.soundAlertIvalId);
    }
  }

  handleClear = () => {
    const {clearAlert} = this.props;
    this.setState({
      alerting: false
    });
    clearAlert();
    this.stopSignaler();

  }
  render(){

    const {alerting,screenColor,textColor} = this.state

    return <div style={{position: 'relate', backgroundColor: screenColor, color: textColor, width: '100%',height: '100vh'}}>
                <h1 style={styles.centerMessage}>Please Orient Device so the Nurse can see it</h1>
                <RaisedButton style={{position: 'absolute',bottom: 0,left: 0}} onTouchTap={this.handleClear} label="Cancel" fullWidth={true} />
                    
            </div>;
  }
}
