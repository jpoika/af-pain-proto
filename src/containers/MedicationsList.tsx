import MedicationsList from '../appcomponents/medication/MedicationsList';
import {connect} from 'react-redux';
import {userSetMedicationStatus} from '../actions/'
import {alertNurseBackground} from '../actions/nurse'


const stateToProps = (state, ownProps) => {
  return {
    understands_meds: state.user.understands_meds
  }
}
const dispatchToProps = (dispatch) => {
  return {
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