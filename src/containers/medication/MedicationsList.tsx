import MedicationsList from '../../appcomponents/medication/MedicationsList';
import {connect} from 'react-redux';
import {userSetMedicationStatus} from '../../actions/'
import {alertNurseBackground/*, alertNurseMedQuestion*/} from '../../actions/nurse'
import {withRouter} from 'react-router-dom';

const stateToProps = (state, ownProps) => {
  return {
    understands_meds: state.user.understands_meds
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  console.log(ownProps);
  return {
    setMedicationStatus: (status: number) => {
      if(status === 3){
        dispatch(alertNurseBackground());
      }
      if(status === 2){
         
         //dispatch(alertNurseMedQuestion());
         ownProps.history.push("/main/medinfo");
      }
      dispatch(userSetMedicationStatus(status));
    }
  }
}
export default withRouter(connect(stateToProps,dispatchToProps)

(MedicationsList));