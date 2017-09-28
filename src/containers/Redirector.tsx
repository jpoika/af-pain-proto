import RedirectorComponent from '../components/Redirector';
import {connect} from 'react-redux';
import { clearRedirect} from '../actions/';
import { withRouter } from 'react-router-dom';


const stateToProps = (state, ownProps) => {
  return {
    path: state.view.redirect.path
  }
}
const dispatchToProps = (dispatch, ownProps) => {
  return {
    clearRedirect: () => {
      dispatch(clearRedirect());
    }
  }
}
export default withRouter(connect(stateToProps,dispatchToProps)(RedirectorComponent));