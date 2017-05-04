import CardPage from '../components/CardPage';
import {homePage} from '../res/data/page';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';

const completedAssessments = (state): any[] => {
  return state.assessmentIds.map(aid => state.assessments[aid]).filter(assess => assess.isComplete);
}

const stateToProps = (state, ownProps) => {
  return {
    title: 'Home',
    page: {title: homePage.title, subtitle: 'Pain Proto', content: homePage.content},
    image: homePage.image && !(state.device.width > 600 || state.device.width > state.device.height)? homePage.image : '',
    
    actions: [
      {label: 'Get Started', action: completedAssessments(state).length > 0 ? ownProps.pathOnTouchTap('/main/account-home') : ownProps.pathOnTouchTap('/main/assessment-start')}
    ]
  }
}
const dispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(stateToProps,dispatchToProps)

(CardPage);