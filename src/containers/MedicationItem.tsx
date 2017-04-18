import MedicationItem from '../appcomponents/MedicationItem';
import {MedicationInterface} from '../res/data/medication';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { medicationAddBlank ,medicationRemove,medicationEdit} from '../actions/medication';


const stateToProps = (state, ownProps) => {
  return {
  }
}
const dispatchToProps = (dispatch) => {
  return {
    update: (medication: MedicationInterface) => dispatch(medicationEdit(medication)),
    deleteItem: (id: number) => dispatch(medicationRemove(id)),
  }
}
export default connect(stateToProps,dispatchToProps)

(MedicationItem);