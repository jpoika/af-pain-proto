import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export interface Props{
  deleteAccount: any;
}

export interface State{
 confirmOpen: boolean;
}
export default class UserOverview extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {

  };

  constructor(props){
    super(props);
    this.state = {
      confirmOpen: false
    }
  }

  handleDeleteAccountConfirmed = (event) => {
    const {deleteAccount} = this.props;
    deleteAccount();
    this.handleClose();
  }

  handleDeleteAccount = (event) => {
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
    const {} = this.props;
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

    return <span>
              <Dialog
                title="Delete Account"
                modal={false}
                open={this.state.confirmOpen}
                actions={actions}
                onRequestClose={this.handleClose}
              >
              <h3>Are you sure you want to delete this account and erase all of its data?</h3>
          
              </Dialog>
              <RaisedButton backgroundColor="red" labelColor="#FFFFFF" label={'Delete Account'} onTouchTap={this.handleDeleteAccount} />
            </span>;
  }
}