import MedicationsList from '../../appcomponents/medication/MedicationManager';
import {connect} from 'react-redux';
import {medicationRemove} from '../../actions/medication';
import {userSetMedicationStatus} from '../../actions/'
import {alertNurseBackground} from '../../actions/nurse'


const stateToProps = (state, ownProps) => {
  return {
    medications: state.medicationIds.map(mid => state.medications[mid + '']),
  }
}

const dispatchToProps = (dispatch) => {
  return {
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