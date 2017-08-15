import CardPage from '../components/CardPage';
import {homePage} from '../res/data/page';
import {connect} from 'react-redux';

const completedAssessments = (state): any[] => {
  return state.assessmentIds.map(aid => state.assessments[aid]).filter(assess => assess.isComplete);
}

const stateToProps = (state, ownProps) => {
  return {
    title: 'About Pain Proto',
    page: {title: homePage.title, subtitle: 'Pain Proto', content: homePage.content},
    image: homePage.image && !(state.device.width > 1000 || state.device.width > state.device.height)? homePage.image : '',
    
    actions: [
      {label: 'Get Started', action: completedAssessments(state).length > 0 ? '/main/account-home' : '/main/assessment-start'}
    ]
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
     actionClick: (path) => {
       ownProps.history.push(path);
     }
  }
}
export default connect(stateToProps,dispatchToProps)

(CardPage);