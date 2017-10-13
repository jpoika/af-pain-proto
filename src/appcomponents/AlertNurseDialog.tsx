import * as React from "react";
//import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import DoneIcon from 'material-ui/svg-icons/action/done';
//import ErrorIcon from 'material-ui/svg-icons/alert/error';
import {/*flexParentRowStyle,flexRowItemStyle*/} from '../components/commonStyles';
import {MessageInterface} from '../res/data/messages';
import {MessagePromptInterface} from '../res/data/messages';
import DialogPrompt from './prompts/DialogPrompt';
import PromptResponse from  './prompts/PromptResponse';

const buttonStyles = {
  marginLeft: 15
}

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
  public static timeOuts = {
    nurseAlerted: null,
    timeoutClose: null
  }
  constructor(props){
    super(props);
    this.state = {
      responseId: 'default'
    }
  }

  handleCancelContactNurse = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.handleClearPrompt(this.props.prompt);
  }


  handleNurseAlert = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const {prompt} = this.props;

    this.setState({
      responseId: 'nurse-contacting'
    });


    AlertNurseDialog.timeOuts.nurseAlerted && clearTimeout(AlertNurseDialog.timeOuts.nurseAlerted);
    AlertNurseDialog.timeOuts.timeoutClose && clearTimeout(AlertNurseDialog.timeOuts.timeoutClose);
    
    AlertNurseDialog.timeOuts.nurseAlerted = setTimeout(() => {
      this.setState({
        responseId: 'nurse-alerted'
      });

      AlertNurseDialog.timeOuts.timeoutClose = setTimeout(() => {
        this.handleClearPrompt(prompt);
      },2000);

    },2000);

  }

  handleClearPrompt = (prompt: MessagePromptInterface) => {
    AlertNurseDialog.timeOuts.nurseAlerted && clearTimeout(AlertNurseDialog.timeOuts.nurseAlerted);
    AlertNurseDialog.timeOuts.timeoutClose && clearTimeout(AlertNurseDialog.timeOuts.timeoutClose);
    this.props.clearPrompt(prompt)
    this.setState({
      responseId: 'default'
    })
  }

  render(){

    const {/*confirmMessage,*/prompt} = this.props;

    // const nurseConfirm = (<div> 
    //                            <div>{confirmMessage.message.map((para,index) => <p key={index}>{para}</p>)}</div>
    //                            <div style={flexParentRowStyle as any}>
    //                              <RaisedButton style={flexRowItemStyle as any} primary={true} type="button" onTouchTap={this.handleNurseAlert}>Yes</RaisedButton>
    //                              <RaisedButton style={flexRowItemStyle as any} type="button" onTouchTap={this.handleCancelContactNurse}>No</RaisedButton>
    //                            </div>
    //                      </div>);

    const shouldContactNurseActions = [
        <RaisedButton primary={true} type="button" onTouchTap={this.handleNurseAlert}>Yes</RaisedButton>,
        <RaisedButton style={buttonStyles} type="button" onTouchTap={this.handleCancelContactNurse}>No</RaisedButton>
    ];

    //dialogId={'nurse_prompt'} promptId={'alert_nurse_prompt'}  promptTag={'nurse_prompt'}
 
    return (<div>
            <DialogPrompt responseId={this.state.responseId} title="Alert Nurse" clearPrompt={this.handleClearPrompt} prompt={prompt}>
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
