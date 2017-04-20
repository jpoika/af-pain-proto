import AssessWizard from '../appcomponents/InitialAssessWizard';

import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {Validators} from '../lib/helpers';
import {assessMoveStep} from '../actions/assessment';


const stateToProps = (state, ownProps) => {

  return {
    title: 'Home',
    page: {title: 'Initial Assessment', subtitle: 'Pain Proto', content: ''},
    stepIndex: state.initialAssessment.step,
    maxSteps: 7
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    nextStep: (step: number) => dispatch(assessMoveStep(step))
  }
}
export default connect(stateToProps,dispatchToProps)

(AssessWizard);