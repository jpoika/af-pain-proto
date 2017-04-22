import AlertScreen from '../appcomponents/AlertScreen';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';


const stateToProps = (state, ownProps) => {
  return {
    alerting: true
  }
}
const dispatchToProps = (dispatch) => {
  return {
    clearAlert: () => {
      dispatch(push('main/account-home'));
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(AlertScreen);