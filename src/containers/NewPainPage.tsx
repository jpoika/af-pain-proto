import AssessmentWizardPage from '../appcomponents/AssessmentWizardPage';
import {connect} from 'react-redux';

const stateToProps = (state, ownProps) => {
  return {
    title: 'New Pain',
    page: {title: "New Pain Assessment", subtitle: 'Pain Proto', content: ''},
    type: 'newpain'
  }
}
const dispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(stateToProps,dispatchToProps)

(AssessmentWizardPage);