import * as React from "react";
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {AssessmentInterface} from '../../res/data/assessments';
import {MessagePromptInterface} from '../../res/data/messages'
export interface Props {
  open: boolean;
  setSeverePain: (hasSeverePain: boolean) => void;
  checkForPrompt: () => void;
  clearPrompt: (prompt: MessagePromptInterface) => void;
  message: {id: number, message: string[]};
  prompt: MessagePromptInterface;
  assessment: AssessmentInterface;
}
export interface State {
  //open: boolean;
}

export default class SeverePainPrompt extends React.Component<Props, State>{

  handleClose = () => {
    //this.props.closeNurseDialog()
  }

  componentDidMount(){
    this.props.checkForPrompt();
  }

  componentWillReceiveProps(newProps){
     //  console.log('--componentWillReceiveProps');
     //  console.log(this.props.assessment,newProps.assessment);
     // if(!this.props.assessment.id && newProps.assessment.id > 0){
     //   this.props.checkForPrompt();
     // }
  }

  handlePainSelection = (hasSeverePain: boolean) => {
    return (event) => {
      this.props.setSeverePain(hasSeverePain)
      this.props.clearPrompt(this.props.prompt);
    }
  }

  render(){

    const {open,message} = this.props;
    const actions = [
      <RaisedButton
        label="Yes"
        primary={true}
        onClick={this.handlePainSelection(true)}
      />,
      <RaisedButton
        label="No"
        primary={true}
        onClick={this.handlePainSelection(false)}
      />,
    ];
    const sentences = message ? message.message : []
    return (<div>
              <Dialog
                title="Alert Nurse"
                modal={false}
                open={open}
                actions={actions}
                onRequestClose={this.handleClose}
              >

                {sentences.map(msg => msg)}
          
              </Dialog>
            </div>);
  }
  
}