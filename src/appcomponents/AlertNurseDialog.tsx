import * as React from "react";
//import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import DoneIcon from 'material-ui/svg-icons/action/done';
//import ErrorIcon from 'material-ui/svg-icons/alert/error';
import {/*flexParentRowStyle,*/flexRowItemStyle} from '../components/commonStyles';
import {MessageInterface} from '../res/data/messages';
import {MessagePromptInterface} from '../res/data/messages';
import DialogPrompt from './prompts/DialogPrompt';
import PromptResponse from  './prompts/PromptResponse';

export interface Props{
  closeNurseDialog(): any;
  alertNurse(): any;
  cancelAlertNurse(): any;
  status: number;
  messages: {id: number, message: string, timestamp: number}[],
  confirmMessage: MessageInterface;

  clearPrompt: (prompt: MessagePromptInterface) => void;
  prompt: MessagePromptInterface;
}
export interface State{
  responseId: string;
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
      responseId: 'default'
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
    this.setState({
      responseId: 'nurse-contacting'
    });
    setTimeout(() => {
      this.setState({
        responseId: 'nurse-alerted'
      });
    },2000);
  }

  render(){

    const {/*confirmMessage,*/prompt,clearPrompt} = this.props;

    // const nurseConfirm = (<div> 
    //                            <div>{confirmMessage.message.map((para,index) => <p key={index}>{para}</p>)}</div>
    //                            <div style={flexParentRowStyle as any}>
    //                              <RaisedButton style={flexRowItemStyle as any} primary={true} type="button" onTouchTap={this.handleNurseAlert}>Yes</RaisedButton>
    //                              <RaisedButton style={flexRowItemStyle as any} type="button" onTouchTap={this.handleCancelContactNurse}>No</RaisedButton>
    //                            </div>
    //                      </div>);

    const shouldContactNurseActions = [
        <RaisedButton style={flexRowItemStyle as any} primary={true} type="button" onTouchTap={this.handleNurseAlert}>Yes</RaisedButton>,
        <RaisedButton style={flexRowItemStyle as any} type="button" onTouchTap={this.handleCancelContactNurse}>No</RaisedButton>

    ]    
    return (<div>
            <DialogPrompt dialogId={'nurse_prompt'} promptId={'alert_nurse_prompt'}  promptTag={'nurse_prompt'}responseId={this.state.responseId} title="Alert Nurse" clearPrompt={clearPrompt} prompt={prompt}>
                <PromptResponse actions={shouldContactNurseActions} responseId='default'>
                   <div>Are you sure you would like to contact the nurse</div>
                </PromptResponse>

                <PromptResponse responseId='nurse-contacting'>
                  <div> Contacting Nurse <CircularProgress /> </div>
                </PromptResponse>

                <PromptResponse responseId='nurse-alerted'>
                  <div> Nurse Alerted <DoneIcon style={styles.largeIcon} color={'green'} /> </div>
                </PromptResponse>
            </DialogPrompt>
            </div>);
  }
}
