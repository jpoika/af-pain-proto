import {connect} from 'react-redux';
import AppThemeComponent from '../components/AppTheme';
import {withRouter} from 'react-router-dom';
import {setPageTitle} from '../actions';

const stateToProps = (state,ownProps) => {
  return {

  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    setPageTitle: (title:string) => {
      dispatch(setPageTitle(title));
    }
  }
}

export default withRouter(connect(stateToProps,dispatchToProps)(AppThemeComponent));