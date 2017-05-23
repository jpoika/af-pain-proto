
//initAssessComplete: typeof state.assessments['1'] !== 'undefined' && state.assessments['1'].isComplete ? true : false
//import UserOverview from '../../appcomponents/user/UserOverview';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import UserTasks from '../../appcomponents/user/UserTasks';
import {addAssessmentIfNecessary} from '../../actions/assessment';
import {viewActions} from '../../lib/local-t2-view';

const getViewPortSize = (state) => {
  const width = state.device.width;
  if(width < 450){
    return 'small';
  }  
  if(width >= 450 && width <= 1000){
    return 'medium';
  }
  return 'large';
}

const stateToProps = (state, ownProps) => {
  const now = new Date();
  const nowTimestamp = now.getTime();
  return {
    initAssessComplete: typeof state.assessments['1'] !== 'undefined' && state.assessments['1'].isComplete ? true : false,
    viewPortSize: getViewPortSize(state),
    reassessmentDeadline: state.assessmentSystem.nextDeadline,
    reassessmentReady: state.assessmentSystem.nextDeadline < (nowTimestamp - 1000 * 60 * 5) //user can start 5 minutes early
  }
}
const dispatchToProps = (dispatch) => {
  return {
    reAssessmentClick: () => {
      dispatch(addAssessmentIfNecessary('reassessment'));
      dispatch(push('/main/reassess'));
    },
    initialAssessmentClick:(isComplete) => {
      console.log(isComplete);
      if(!isComplete){
        dispatch(push('/main/assessment-start'));
      }else {
        dispatch(viewActions.sendMessage('Already Complete!'));
      }
      
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(UserTasks);