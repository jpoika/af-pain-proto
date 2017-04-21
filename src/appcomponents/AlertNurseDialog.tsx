import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import Form, {Props as FormProps}  from './AccountForm';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
export interface Props{
  open: boolean;
  closeNurseDialog(): any
}
export interface State{

}

export default class AlertNurseDialog extends React.Component<Props, State>{
  constructor(props){
    super(props);
  }

  handleClose = () => {
    this.props.closeNurseDialog()
  }
  /*
  shouldComponentUpdate(nextProps, nextState){
    console.log(nextProps, nextState);
    if(nextProps.open !== nextState.open){
      return true;
    }
    return false;
  }
  */
  componentWillReceiveProps(nextProps){

    this.setState({
      open: nextProps.open
    });
  }

  render(){

    const {open} = this.props;

    return (<div>
            <Dialog
              title="Dialog With Actions"
              modal={false}
              open={open}
              onRequestClose={this.handleClose}
            >
              <h2>
                Test Nurse
              </h2>
              </Dialog>
            </div>);
  }
}
