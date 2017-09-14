import AssessWizard from '../../appcomponents/assessment/MainAssessmentWizard';
import {AssessmentInterface} from '../../res/data/assessments';
import {connect} from 'react-redux';

import {assessMoveStep,assessMarkComplete/*,editAssessment*/} from '../../actions/assessment';
import {withRouter} from 'react-router-dom';
import {viewActions} from '../../lib/local-t2-view';
import {makeAssessment} from '../../res/data/assessments';
import {getLastNonInitialIncompleteAssessementsByType} from './selectors'
const maxSteps = 6;

const get_or_create_current_assessment = (state,ownProps) => {
  let lastAssessment = getLastNonInitialIncompleteAssessementsByType(state,ownProps)
  return lastAssessment || state.assessments['1'];
}

const stateToProps = (state, ownProps:{type: string}) => {
  let assessment = get_or_create_current_assessment(state,ownProps);

  if(ownProps.type && ownProps.type !== assessment.type){
    assessment = makeAssessment(0,'',ownProps.type);
  }

  return {
    title: 'Reassessment',
    page: {title: 'Reassessment', subtitle: 'Pain Proto', content: ''},
    stepIndex: assessment && assessment.step ? assessment.step : 0,
    maxSteps: maxSteps,
    assessment: assessment,
    canStart: true
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    nextStep: (step: number,assessment: AssessmentInterface) => {
      dispatch(assessMoveStep(step,assessment));
      if(step >= maxSteps){
        dispatch(assessMarkComplete(assessment,1));
        dispatch(viewActions.sendMessage('Assessment Complete'));

        ownProps.history.push('/main/account-home');
      }
    }
  }
}

export default withRouter(connect(stateToProps,dispatchToProps)(AssessWizard));


