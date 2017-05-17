
import * as React from "react";
import Checkbox from 'material-ui/Checkbox';
export interface Props{
  enabled: boolean;
  enable(): void;
  disable(): void;
}
export interface State{

}
export default class AccountPage extends React.Component<Props, State>{
  handleCheckClick = (event: object, isInputChecked: boolean) => {
    const {enable,disable} = this.props
    if(isInputChecked){
      enable();
    }else{
      disable();
    }
  }
  render(){
    const {enabled} = this.props
    return <div>

                <Checkbox onCheck={this.handleCheckClick} checked={enabled} label="Do Not Disturb" />
                    
           </div>;
  }
}