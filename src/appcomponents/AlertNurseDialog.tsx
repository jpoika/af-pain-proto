import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import Form, {Props as FormProps}  from './AccountForm';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
export interface Props{
  open: boolean;
}
export interface State{
  open: boolean;
}

export default class AlertNurseDialog extends React.Component<Props, State>{
  constructor(props){
    super(props);
    this.state = {
      open: this.props.open
    };
  }

  handleClose = () => {
    this.setState({open: false});
  }

  render(){

    const {open} = this.state;

    return (<div>
            <Dialog
              title="Dialog With Actions"
              modal={false}
              open={open}
              onRequestClose={this.handleClose}
            >
              <h3>Test Nurse</h3>
              </Dialog>
            </div>);
  }
}
