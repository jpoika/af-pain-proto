import * as React from "react";
import Dialog from 'material-ui/Dialog';

import {MessagePromptInterface} from '../../res/data/messages';

export interface Props {
  clearPrompt: (prompt: MessagePromptInterface) => void;
  message?: {id: number, message: string[]}; //TODO make required???
  prompt: MessagePromptInterface;


  responseId?: string;
  title?: string;
  actions?: JSX.Element[];
}

export interface State {
  responseId: string;
  responses: any[];
  open: boolean;
  actions: JSX.Element[];
}


export default class DialogPrompt extends React.Component<Props, State>{
  static defaultProps: Partial<Props> = {
    responseId: 'default',
    title: '',
    actions: [],
    message: {id: 0, message: []}
  }

  public initialChildren: any[] = [];

  constructor(props){
    super(props);
    this.state = {
      responseId: props.responseId,
      responses: [],
      open: props.prompt ? true : false,
      actions: props.actions
    }
  }

 // handleSelectChange = (event, index, selectValues) => this.setState({selectValues});

  handleClearPrompt = () => {
    if(this.props.prompt){
      this.props.clearPrompt(this.props.prompt);
    }
    this.setResponseChildren('default');
  }

  componentWillMount(){
     this.initialChildren = !this.props.children ? [] : React.Children.map(this.props.children,child => child)
     this.setResponseChildren(this.state.responseId);
  }

  setResponseChildren = (responseId) => {
    let actions = [];
    const respChildren = this.initialChildren.map<any>(
     (child) => {
       if(typeof child.props.responseId !== 'undefined' && child.props.responseId === responseId){
    
         actions = child.props.actions.length > 0 ? child.props.actions: [];
         return child;
       }
       return null;
     }
    );
    this.setState({
      responses: respChildren,
      responseId,
      actions
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.responseId !== nextProps.responseId){
      this.setResponseChildren(nextProps.responseId);
    }
  }


  render(){

    const {message,title} = this.props;
    const {actions,open} = this.state;

    const sentences = message ? message.message : []
    return (<div>
              <Dialog
                title={title}
                modal={false}
                open={open}
                actions={actions}
                onRequestClose={this.handleClearPrompt}
              >
                {sentences.map((msg,i) => <p key={i}>{msg}</p>)}
                {this.state.responses}
              </Dialog>
            </div>);
  }
  
}