import AssessWizard from '../appcomponents/InitialAssessmentWizard';

import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {Validators} from '../lib/helpers';
import {assessMoveStep,assessMarkComplete} from '../actions/assessment';
import {viewActions} from '../lib/local-t2-view';

const maxSteps = 7;

const get_assessment = (id,state) => {
  return state.assessments[id]
}

const stateToProps = (state, ownProps) => {
  let assessment = get_assessment('1',state);
  return {
    title: 'Initial Assessment',
    page: {title: 'Initial Assessment', subtitle: 'Pain Proto', content: ''},
    stepIndex: assessment.step || 0,
    maxSteps: maxSteps,
    assessment: assessment,
    restoreContent: ownProps.restoreContent,
    replaceContent: ownProps.replaceContent,
    canStart: true
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    nextStep: (step: number,assessmentId: number) => {
      dispatch(assessMoveStep(step,assessmentId));
      if(step >= maxSteps){
        dispatch(assessMarkComplete(assessmentId,1));
        dispatch(viewActions.sendMessage('Assessment Complete'));
        dispatch(push('/main/account-home'));
      }
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(AssessWizard);