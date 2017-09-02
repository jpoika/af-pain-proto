import {connect} from 'react-redux';
import AppThemeComponent from '../components/AppTheme';
import {withRouter} from 'react-router-dom';
import {setPageTitle} from '../actions';
import {alertNurseDialogueOpen} from '../actions/nurse';
import {sendMessage} from '../actions/';
const stateToProps = (state,ownProps) => {
  return {
   flashMessage: state.view.flash
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    setPageTitle: (title:string) => {
      dispatch(setPageTitle(title));
    },
    alertNurse: () => {
      dispatch(alertNurseDialogueOpen())
    },
    sendMessage: (message: string) => {
      dispatch(sendMessage(message));
    } 
  }
}

export default withRouter(connect(stateToProps,dispatchToProps)(AppThemeComponent));