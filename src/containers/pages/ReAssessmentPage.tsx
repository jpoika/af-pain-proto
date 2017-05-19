import AssessmentWizardPage from '../../appcomponents/pages/MainAssessmentWizardPage';
import {connect} from 'react-redux';

const stateToProps = (state, ownProps) => {
  return {
    title: 'Reassessment',
    page: {title: "Reassess Your Pain", subtitle: 'Pain Proto', content: ''},
    type: 'reassessment'
  }
}
const dispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(stateToProps,dispatchToProps)

(AssessmentWizardPage);