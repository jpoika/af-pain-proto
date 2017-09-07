import UserDeleteAccountControl from '../../appcomponents/user/UserDeleteAccountControl';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {deleteAccount,sendMessage} from '../../actions'

const stateToProps = (state, ownProps) => {
  return {
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    deleteAccount: () => {
      dispatch(deleteAccount());
      ownProps.history.push('/');
      dispatch(sendMessage("Profile Deleted."));
    }
  }
}
export default withRouter(connect(stateToProps,dispatchToProps)(UserDeleteAccountControl));