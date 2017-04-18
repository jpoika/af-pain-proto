import MedicationsList from '../appcomponents/MedicationsList';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { medicationAddBlank ,medicationRemove} from '../actions/medication';


const stateToProps = (state, ownProps) => {
  return {
    medications: state.medicationIds.map(mid => state.medications[mid + ''])
  }
}
const dispatchToProps = (dispatch) => {
  return {
    addMedication: () => dispatch(medicationAddBlank())
  }
}
export default connect(stateToProps,dispatchToProps)

(MedicationsList);