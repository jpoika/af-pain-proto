import MedicationsPage from '../../appcomponents/pages/Medications';
import {connect} from 'react-redux';
import {getSystemMedications} from '../medication/selectors'
import {getInCompleteAssessements} from '../assessment/selectors'

const stateToProps = (state, ownProps) => {
  return {
    title: 'Medications',
    page: {title: 'Extras', subtitle: 'Pain Proto', content: ''},
    medications: getSystemMedications(state, ownProps),
    incompleteAssessment: getInCompleteAssessements(state, ownProps).pop()
  }
}
const dispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(stateToProps,dispatchToProps)

(MedicationsPage);