import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import Form, {Props as FormProps}  from './AccountForm';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import DoneIcon from 'material-ui/svg-icons/action/done'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import MessageIcon from 'material-ui/svg-icons/communication/message'
export interface Props{
  open: boolean;
  closeNurseDialog(): any;
  status: number;
  messages: {id: number, message: string, timestamp: number}[]
}
export interface State{
  showLastMessage: boolean;
}

const styles = {

  largeIcon: {
    width: 60,
    height: 60,
  },

};

export default class AlertNurseDialog extends React.Component<Props, State>{
  constructor(props){
    super(props);
    this.state = {
      showLastMessage: false
    }
  }

  handleClose = () => {
    this.props.closeNurseDialog()
  }
  /*
  shouldComponentUpdate(nextProps, nextState){
    console.log(nextProps, nextState);
    if(nextProps.open !== nextState.open){
      return true;
    }
    return false;
  }
 
  componentWillReceiveProps(nextProps){

  }
 */
  render(){

    const {open,status,messages} = this.props;
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (<div>
            <Dialog
              title="Alert Nurse"
              modal={false}
              open={open}
              actions={actions}
              onRequestClose={this.handleClose}
            >
  
              {status === 1 && <div> Contacting Nurse <CircularProgress /> </div>}
              {status === 2 && <div> Nurse Acknowledge <DoneIcon style={styles.largeIcon} color={'green'} /> </div>}
              {status === 3 && <div> Request Timeout <ErrorIcon /> </div>}
              {messages.map(msg => (<div key={msg.id}><MessageIcon /> {msg.message}</div>))}
          
              </Dialog>
            </div>);
  }
}
