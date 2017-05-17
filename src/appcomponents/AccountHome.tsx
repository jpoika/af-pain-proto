import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import NewPainButton from '../containers/NewPainButton';
import DoNotDisturbControll from '../containers/DoNotDisturbControll';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
export interface Props extends PageProps{
 deleteAccount: any;
}

export interface State{
  confirmOpen: boolean;
}

const styles = {
  appActionContainer: {

    position: 'fixed',
    bottom: 10,
    right: 10,
    margin: '0 auto'
  }
}

export default class AccountHome extends React.Component<Props, State> {

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
             <div style={{position: 'relative'}}>
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
                    <DoNotDisturbControll />
              
                 
                    <NewPainButton style={styles.appActionContainer as any} />
         
              </div>
            </BasicPage>);
  }
}
