import * as React from "react";

export interface Props {
 responseId: string|number;
 actions?: JSX.Element[];
}

export interface State {

}

export default class PromptResponse extends React.Component<Props, State>{

  static defaultProps: Partial<Props> = {
    actions: []
  }
  
  render(){
    return (<div>
               {this.props.children}
            </div>);
  }
  
}