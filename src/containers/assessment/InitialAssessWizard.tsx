import AssessWizard from '../../appcomponents/assessment/InitialAssessmentWizard';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {assessMoveStep,assessMarkComplete} from '../../actions/assessment';
import {AssessmentInterface} from '../../res/data/assessments';
import {viewActions} from '../../lib/local-t2-view';

const maxSteps = 6;

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