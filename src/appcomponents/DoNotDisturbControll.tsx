
import * as React from "react";
import Checkbox from 'material-ui/Checkbox';
import DoNotDisturbOn from 'material-ui/svg-icons/notification/do-not-disturb-on';
import DoNotDisturbOff from 'material-ui/svg-icons/notification/do-not-disturb-off';
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
        
                <Checkbox 
                  checkedIcon={<DoNotDisturbOn />}
                  uncheckedIcon={<DoNotDisturbOff />}
                  onCheck={this.handleCheckClick} checked={enabled} label={enabled ? "Do Not Disturb On" : "Do Not Disturb Off"} />
                    
           </div>;
  }
}