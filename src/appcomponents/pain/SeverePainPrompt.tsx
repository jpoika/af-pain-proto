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
  responseId?: string;
}

export interface State {
  responseId: string;
  responses: any[];
}

export default class SeverePainPrompt extends React.Component<Props, State>{
  static defaultProps: Partial<Props> = {
    responseId: 'default'
  }

  public initialChildren: any[] = [];

  constructor(props){
    super(props);
    this.state = {
      responseId: props.responseId,
      responses: []
    }
  }

  handleClose = () => {
    //this.props.closeNurseDialog()
  }

  componentDidMount(){
    this.props.checkForPrompt();
  }
  componentWillMount(){
     this.initialChildren = !this.props.children ? [] : React.Children.map(this.props.children,child => child)
     this.getResponseChildren(this.state.responseId);
  }

  getResponseChildren = (responseId) => {
    const respChildren = this.initialChildren.map(
     (child) => {
       if(typeof (child as any).props.responseId !== 'undefined' && (child as any).props.responseId === responseId){
         return child;
       }
       return null;
     }
    );
    this.setState({
      responses: respChildren,
      responseId
    });
  }


  handlePainSelection = (hasSeverePain: boolean) => {
    return (event) => {
      this.props.setSeverePain(hasSeverePain);
      if(hasSeverePain){
        this.getResponseChildren('nurse-alert');
        setTimeout(() => {
         this.getResponseChildren('nurse-alert-done');
         
        },2000);
        setTimeout(() => {
         this.props.clearPrompt(this.props.prompt);
        },3500);
      } else {
        this.props.clearPrompt(this.props.prompt);
      }
      
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
                {this.state.responses}
              </Dialog>
            </div>);
  }
  
}