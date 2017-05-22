import AssessmentWizardPage from '../../appcomponents/pages/MainAssessmentWizardPage';
import {connect} from 'react-redux';

const stateToProps = (state, ownProps) => {
  const now = new Date();
  const nowTimestamp = now.getTime();
  return {
    title: 'Reassessment',
    page: {title: "Reassess Your Pain", subtitle: 'Pain Proto', content: ''},
    type: 'reassessment',
    deadline: state.assessmentSystem.nextDeadline,
    isReady: state.assessmentSystem.nextDeadline < (nowTimestamp - 1000 * 60 * 5) //user can start 5 minutes early
  }
}
const dispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(stateToProps,dispatchToProps)

(AssessmentWizardPage);