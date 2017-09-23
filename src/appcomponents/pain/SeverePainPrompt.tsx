import * as React from "react";
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
export interface Props {
  open: boolean;
  setSeverePain: (hasSeverePain: boolean) => void;
}
export interface State {
  //open: boolean;
}

export default class SeverePainPrompt extends React.Component<Props, State>{

  handleClose = () => {
    //this.props.closeNurseDialog()
  }

  render(){

    const {open,setSeverePain} = this.props;
    const actions = [
      <RaisedButton
        label="Yes"
        primary={true}
        onClick={() => {setSeverePain(true)}}
      />,
      <RaisedButton
        label="No"
        primary={true}
        onClick={() => {setSeverePain(false)}}
      />,
    ];

    return (<div>
              <Dialog
                title="Alert Nurse"
                modal={false}
                open={open}
                actions={actions}
                onRequestClose={this.handleClose}
              >

                Are you experiencing severe pain?
          
              </Dialog>
            </div>);
  }
  
}