import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import Form, {Props as FormProps}  from './AccountForm';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import DoneIcon from 'material-ui/svg-icons/action/done';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import MessageIcon from 'material-ui/svg-icons/communication/message';
import {flexParentRowStyle,flexRowItemStyle} from '../components/commonStyles';
import {MessageInterface} from '../res/data/messages';
export interface Props{
  open: boolean;
  closeNurseDialog(): any;
  alertNurse(): any;
  cancelAlertNurse(): any;
  status: number;
  messages: {id: number, message: string, timestamp: number}[],
  confirmMessage: MessageInterface;
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
  handleCancelContactNurse = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.handleClose();
  }
  handleNurseAlert = (event) => {
    const {alertNurse} = this.props;
    alertNurse();
  }

  render(){

    const {open,status,messages,confirmMessage} = this.props;
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    const nurseConfirm = (<div> 
                               <div>{confirmMessage.message.map(para => <p>{para}</p>)}</div>
                               <div style={flexParentRowStyle as any}>
                                 <RaisedButton style={flexRowItemStyle as any} primary={true} type="button" onTouchTap={this.handleNurseAlert}>Yes</RaisedButton>
                                 <RaisedButton style={flexRowItemStyle as any} type="button" onTouchTap={this.handleCancelContactNurse}>No</RaisedButton>
                               </div>
                         </div>);
    return (<div>
            <Dialog
              title="Alert Nurse"
              modal={false}
              open={open}
              actions={actions}
              onRequestClose={this.handleClose}
            >
              {status === 0 && nurseConfirm}
              {status === 1 && <div> Contacting Nurse <CircularProgress /> </div>}
              {status === 2 && <div> Nurse Acknowledge <DoneIcon style={styles.largeIcon} color={'green'} /> </div>}
              {status === 3 && <div> Request Timeout <ErrorIcon /> </div>}

          
              </Dialog>
            </div>);
  }
}
