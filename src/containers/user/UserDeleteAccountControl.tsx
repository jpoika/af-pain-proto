import UserDeleteAccountControl from '../../appcomponents/user/UserDeleteAccountControl';
import {connect} from 'react-redux';

import {deleteAccount} from '../../actions'

const stateToProps = (state, ownProps) => {
  return {
  }
}
const dispatchToProps = (dispatch) => {
  return {
    deleteAccount: () => {
      dispatch(deleteAccount());
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(UserDeleteAccountControl);