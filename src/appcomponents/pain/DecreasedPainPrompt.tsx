import * as React from "react";
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {MessagePromptInterface} from '../../res/data/messages'
export interface Props {
  open: boolean;
  clearPrompt: (prompt: MessagePromptInterface) => void;
  message: {id: number, message: string[]};
  prompt: MessagePromptInterface;
  responseId?: string;
}

export interface State {
  responseId: string;
  responses: any[];
}

export default class DecreasedPainPrompt extends React.Component<Props, State>{
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

  handleClearPrompt = () => {
    this.props.clearPrompt(this.props.prompt);
    this.getResponseChildren('default');
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


  handleSelection = (isYes: boolean) => {
    return (event) => {
      if(isYes){
        this.getResponseChildren('thank-you');
        setTimeout(() => {
         this.handleClearPrompt();
        },2000);
      } else {
        this.handleClearPrompt();
      }
      
    }
  }

  render(){

    const {open,message} = this.props;
    const actions = [
      <RaisedButton
        label="Yes"
        primary={true}
        onClick={this.handleSelection(true)}
      />,
      <RaisedButton
        label="No"
        primary={true}
        onClick={this.handleSelection(false)}
      />,
    ];

    const sentences = message ? message.message : []
    return (<div>
              <Dialog
                title="Pain Decrease?"
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