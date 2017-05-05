import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Dialog from 'material-ui/Dialog';
export interface Props extends PageProps{
  deleteAccountAction: any;
}

export interface State{
  confirmOpen: boolean;
}
export default class AccountHome extends React.Component<Props, any> {

  constructor(props){
    super(props);
    this.state = {
      confirmOpen: false
    }
  }

  handleDeleteAccountConfirmed = (event) => {
    const {deleteAccountAction} = this.props;
    deleteAccountAction();
    this.handleClose();
  }

  handleDeleteAccount = (event) => {
    const {deleteAccountAction} = this.props;
    this.setState({
      confirmOpen: true
    });
  }
  handleClose = () => {
    this.setState({
      confirmOpen: false
    });
  }
  render(){
    const {appBarTitle,page,title} = this.props;
   const actions = [
      <FlatButton
        label="Yes"
        secondary={true}
        onTouchTap={this.handleDeleteAccountConfirmed}
      />,

      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];


    return (<BasicPage appBarTitle={appBarTitle} page={page} title={title}>
              <Dialog
                title="Delete Account"
                modal={false}
                open={this.state.confirmOpen}
                actions={actions}
                onRequestClose={this.handleClose}
              >
              <h3>Are you sure you want to delete this account and erase all of its data?</h3>
          
              </Dialog>

                  <RaisedButton label={'Delete Account'} onTouchTap={this.handleDeleteAccount} />
                    
            </BasicPage>);
  }
}
