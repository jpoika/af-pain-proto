
import * as React from "react";
import { Redirect } from 'react-router-dom'

export interface Props{
  path: string;
  clearRedirect: () => void;
}

export interface State {

}
export default class Redirector extends React.Component<Props, State>{
  
  componentDidMount(){
    if(this.props.path.length > 0){
        this.props.clearRedirect();
    }
  }
  componentDidUpdate(){
    if(this.props.path.length > 0){
        this.props.clearRedirect();
    }
  }

  render(){
    return this.props.path.length > 0 ? <Redirect to={this.props.path} /> : null;
  }
}