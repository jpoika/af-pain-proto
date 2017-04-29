import AssessWizard from '../appcomponents/ReAssessmentWizard';

import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {Validators} from '../lib/helpers';
import {assessMoveStep,assessMarkComplete} from '../actions/assessment';
import {makeAssessment} from '../res/data/assessments';
import {viewActions} from '../lib/local-t2-view';
import {nextId} from '../actions/_helper';
const maxSteps = 5;

const get_or_create_current_assessment = (state) => {
  let lastAssessment = state.assessmentIds
                          .map(aid => state.assessments[aid])
                          .filter(assess => assess.id !== 1)
                          .pop();
  return lastAssessment || state.assessmentIds['1'];
}

const stateToProps = (state, ownProps) => {
  let assessment = get_or_create_current_assessment(state);

  return {
    title: 'Initial Assessment',
    page: {title: 'Initial Assessment', subtitle: 'Pain Proto', content: ''},
    stepIndex: assessment && assessment.step ? assessment.step : 0,
    maxSteps: maxSteps,
    assessmentId: assessment ? assessment.id : null
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    nextStep: (step: number,assessmentId: number) => {
      dispatch(assessMoveStep(step,assessmentId));
      if(step >= maxSteps){
        dispatch(assessMarkComplete(assessmentId));
        dispatch(viewActions.sendMessage('Assessment Complete'));
      }
    }
  }
}

export default connect(stateToProps,dispatchToProps)
(AssessWizard);