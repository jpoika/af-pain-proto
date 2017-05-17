import PreAssesmentTest from '../appcomponents/PreAssesmentTest';
import {homePage} from '../res/data/page';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {assessMarkComplete,assessMoveStep} from '../actions/assessment';

const stateToProps = (state, ownProps) => {
  return {
    assessment: ownProps.assessment
  }
}
const dispatchToProps = (dispatch, ownProps) => {
  return {
    skipAssessment: (assessment,lastStepIdx) => {
      dispatch(assessMoveStep(ownProps.lastStepIndex,assessment.id))
      dispatch(assessMarkComplete(assessment.id,3));
    },
    noChangeAssessment: (assessment) => {
      dispatch(assessMoveStep(ownProps.lastStepIndex,assessment.id))
      dispatch(assessMarkComplete(assessment.id,2));  
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(PreAssesmentTest);