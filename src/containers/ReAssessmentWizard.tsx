import AssessWizard from '../appcomponents/ReAssessmentWizard';

import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {Validators} from '../lib/helpers';
import {assessMoveStep,assessMarkComplete} from '../actions/assessment';
import {viewActions} from '../lib/local-t2-view';
const maxSteps = 5;
const initialAssessmentId = 1;
const stateToProps = (state, ownProps) => {

  return {
    title: 'Reassessment',
    page: {title: 'Reassessment', subtitle: 'Pain Proto', content: ''},
    stepIndex: state.initialAssessment.step,
    maxSteps: maxSteps,
    assessmentId: initialAssessmentId
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    nextStep: (step: number,assessmentId: number) => {
      dispatch(assessMoveStep(step));
      if(step >= maxSteps){
        dispatch(assessMarkComplete(assessmentId));
        dispatch(viewActions.sendMessage('Assessment Complete'));
      }
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(AssessWizard);