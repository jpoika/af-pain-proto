import AccountHome from '../../appcomponents/pages/AccountHomePage';
import {homePage} from '../../res/data/page';
import {connect} from 'react-redux';

import {deleteAccount} from '../../actions'
const getViewPortSize = (state) => {
  const width = state.device.width;
  if(width < 450){
    return 'small';
  }  
  if(width >= 450 && width <= 1000){
    return 'medium';
  }
  return 'large';
};

const stateToProps = (state, ownProps) => {
  return {
    title: 'Dashboard',
    page: {title: homePage.title, subtitle: 'Pain Proto', content: homePage.content},
    initAssessComplete: typeof state.assessments['1'] !== 'undefined' && state.assessments['1'].isComplete ? true : false,
    viewPortSize: getViewPortSize(state),
    haveUserInfo: state.user.firstname.length > 0 ? true : false 
  }
}

const dispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(stateToProps,dispatchToProps)

(AccountHome);