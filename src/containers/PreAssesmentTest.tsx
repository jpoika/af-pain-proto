import PreAssesmentTest from '../appcomponents/PreAssesmentTest';
import {homePage} from '../res/data/page';
import {connect} from 'react-redux';
import { push, go } from 'react-router-redux';
import {assessMarkComplete,assessMoveStep,assessDelete} from '../actions/assessment';
import {viewActions} from '../lib/local-t2-view';
const stateToProps = (state, ownProps) => {
  return {
    assessment: ownProps.assessment,
    returnPath: state.navigation.paths.last.pathname || '/main/account-home'
  }
}
const dispatchToProps = (dispatch, ownProps) => {
  return {
    skipAssessment: (assessment,lastStepIdx) => {
      dispatch(assessMoveStep(ownProps.lastStepIndex,assessment.id))
      dispatch(assessMarkComplete(assessment.id,3));
      dispatch(viewActions.sendMessage("Thank You"));
    },
    noChangeAssessment: (assessment) => {
      dispatch(assessMoveStep(ownProps.lastStepIndex,assessment.id))
      dispatch(assessMarkComplete(assessment.id,2)); 
      dispatch(viewActions.sendMessage("We're done!")); 
    },
    deleteAssessment: (assessment,returnPath) => {
      dispatch(push(returnPath));
      dispatch(assessDelete(assessment.id));  
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(PreAssesmentTest);