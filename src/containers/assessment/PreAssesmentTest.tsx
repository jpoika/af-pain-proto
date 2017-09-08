import PreAssesmentTest from '../../appcomponents/assessment/PreAssesmentTest';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {assessMarkComplete,assessMoveStep,assessDelete} from '../../actions/assessment';
import {viewActions} from '../../lib/local-t2-view';
const stateToProps = (state, ownProps) => {
  //const lastPath = state.navigation.paths.last ? state.navigation.paths.last.pathname : null;
  return {
    assessment: ownProps.assessment,
    returnPath: '/main/account-home'
  }
}
const dispatchToProps = (dispatch, ownProps) => {
  return {
    skipAssessment: (assessment,lastStepIdx) => {
      dispatch(assessMoveStep(ownProps.lastStepIndex,assessment.id))
      dispatch(assessMarkComplete(assessment.id,3)); //TODO shouldn't be able to call with null assessment
      dispatch(viewActions.sendMessage("Thank You"));

      ownProps.history.push('/main/account-home');
    },
    noChangeAssessment: (assessment) => {
      dispatch(assessMoveStep(ownProps.lastStepIndex,assessment.id))
      dispatch(assessMarkComplete(assessment.id,2)); //TODO shouldn't be able to call with null assessment
      dispatch(viewActions.sendMessage("We're done!")); 

      ownProps.history.push('/main/account-home');
    },
    deleteAssessment: (assessment,returnPath) => {

      ownProps.history.push(returnPath);
      dispatch(assessDelete(assessment.id));  
    }
  }
}
export default withRouter(connect(stateToProps,dispatchToProps)
(PreAssesmentTest));