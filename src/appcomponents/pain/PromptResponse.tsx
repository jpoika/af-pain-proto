import * as React from "react";

export interface Props {
 responseId: string|number;
}

export interface State {

}

export default class PromptResponse extends React.Component<Props, State>{


  render(){
    return (<div>
               {this.props.children}
            </div>);
  }
  
}