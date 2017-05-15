import MedicationsList from '../appcomponents/medication/MedicationsList';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { medicationAddBlank ,medicationRemove} from '../actions/medication';
import {userSetMedicationStatus} from '../actions/'
import {alertNurseBackground} from '../actions/nurse'


const stateToProps = (state, ownProps) => {
  return {
    medications: state.medicationIds.map(mid => state.medications[mid + '']),
    medication_status: state.user.understands_meds
  }
}
const dispatchToProps = (dispatch) => {
  return {
    addMedication: () => dispatch(medicationAddBlank()),
    deleteMedication: (id: number) => dispatch(medicationRemove(id)),
    setMedicationStatus: (status: number) => {
      if(status === 3){
        dispatch(alertNurseBackground());
      }
      dispatch(userSetMedicationStatus(status));
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(MedicationsList);