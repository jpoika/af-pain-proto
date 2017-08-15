import {connect} from 'react-redux';
import MainLeftIcon from '../appcomponents/MainLeftIcon';
import {withRouter} from 'react-router-dom';
import {mainMenu} from '../res/data/menus';
//import {setPageTitle} from '../actions';

const stateToProps = (state,ownProps) => {
  return {
    user: state.user,
    menuItems: mainMenu,
    initAssessComplete: typeof state.assessments['1'] !== 'undefined' && state.assessments['1'].isComplete ? true : false
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    pathOnTouchTap: (path) => {
      return (event) => {
        event.stopPropagation();
        event.preventDefault();
        ownProps.history.push(path);
      }
    }
  }
}

export default withRouter(connect(stateToProps,dispatchToProps)(MainLeftIcon));