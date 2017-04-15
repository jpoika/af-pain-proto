import AssessWizard from '../appcomponents/InitialAssessWizard';

import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {Validators} from '../lib/helpers';

const stateToProps = (state, ownProps) => {

  return {
    title: 'Home',
    page: {title: 'Initial Assessment', subtitle: 'Pain Proto', content: ''},
    stepIndex: 0
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    selectPain: (painLevel: number) => {
      console.log(painLevel);
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(AssessWizard);