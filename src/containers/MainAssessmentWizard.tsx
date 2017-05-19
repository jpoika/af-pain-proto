import AssessWizard from '../appcomponents/MainAssessmentWizard';

import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {Validators} from '../lib/helpers';
import {assessMoveStep,assessMarkComplete} from '../actions/assessment';

import {viewActions} from '../lib/local-t2-view';
import {nextId} from '../actions/_helper';
const maxSteps = 7;

const get_or_create_current_assessment = (state,type) => {
  let lastAssessment = state.assessmentIds
                          .map(aid => state.assessments[aid])
                          .filter(assess => assess.id !== 1)
                          .filter(assess => assess.type === type)
                          .pop();
  return lastAssessment || state.assessmentIds['1'];
}

const stateToProps = (state, ownProps) => {
  let assessment = get_or_create_current_assessment(state,ownProps.type);

  return {
    title: 'Reassessment',
    page: {title: 'Reassessment', subtitle: 'Pain Proto', content: ''},
    stepIndex: assessment && assessment.step ? assessment.step : 0,
    maxSteps: maxSteps,
    assessment: assessment ? assessment : null,
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