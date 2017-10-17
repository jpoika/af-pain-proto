import MedicationItem from '../../appcomponents/medication/MedicationItemEdit';
import {MedicationInterface, frequencyUnits, amountUnits, routes, makeUserDefinedMedication} from '../../res/data/medication';
import {connect} from 'react-redux';
import {medicationEdit,medicationChoiceEdit} from '../../actions/medication';
import {Validators} from '../../lib/helpers';
import {viewActions} from '../../lib/local-t2-view';

const validateData = (data) => {
   let isValid = true;
   let errors = Object.keys(data).reduce((acc,propName) => {
     acc[propName] = '';
     switch(propName){
       case 'id':
         acc[propName] = '';
         break;
       case 'medicationId':
      // case 'frequencyUnit':
         acc[propName] = !Validators.isNumeric(data[propName]) || ! data[propName]  ? 'Required.' : '';

       case 'name':
      // case 'frequencyUnit':
         //acc[propName] = !Validators.isString(data[propName]) || !data[propName].length ? 'Required.' : '';
         break;
         /*
       case 'amount':
       case 'frequency':
         acc[propName] = !Validators.isNumeric(data[propName]) ? 'Please enter a number' : '';
         break; 
         */
       //case 'amountUnitId':
       case 'routeId':
         acc[propName] = !Validators.isNumeric(data[propName]) || ! data[propName] ? "Required." : ''
         break;
       default:
         console.log('Enexpected field: ' + propName);
         break;

     }
     if(acc[propName].length){
       isValid = false
     }
     return acc;
   },{});

   return {isValid,errors}
};


const stateToProps = (state, ownProps) => {
  return {
    newMedicationChoice: makeUserDefinedMedication(0,''),
    frequencyUnits,
    routes,
    amountUnits,
    medicationchoices: state.medicationchoiceIds.map(mid => state.medicationchoices[mid])
  }
}
const dispatchToProps = (dispatch) => {
  return {
    update: (medication: MedicationInterface) => dispatch(medicationEdit(medication)),
    validate: (data: MedicationInterface) => {
      const result = validateData(data);
      if(result.isValid){
        dispatch(viewActions.sendMessage('Medication Saved'));
      } else {
        dispatch(viewActions.sendMessage('Please correct any errors above'));
      }
      
      return result;
    },
    addMedicationChoice: (medication: MedicationInterface) => {
      dispatch(medicationChoiceEdit(medication));
    },
    sendMessage: (message: string) => {
      dispatch(viewActions.sendMessage(message));
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(MedicationItem);
