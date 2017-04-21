import MedicationItem from '../appcomponents/MedicationItemEdit';
import {MedicationInterface, frequencyUnits, amountUnits, routes} from '../res/data/medication';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { medicationAddBlank,medicationRemove,medicationEdit} from '../actions/medication';
import {Validators} from '../lib/helpers'
import {viewActions} from '../lib/local-t2-view';

const validateData = (data) => {
   let isValid = true;
   let errors = Object.keys(data).reduce((acc,propName) => {
     acc[propName] = '';
     switch(propName){
       case 'id':
         acc[propName] = '';
         break;
       case 'name':
       case 'frequencyUnit':
         acc[propName] = !Validators.isString(data[propName]) || !data[propName].length ? 'Required.' : '';
         break;
       case 'amount':
       case 'frequency':
         acc[propName] = !Validators.isNumeric(data[propName]) ? 'Please enter a number' : '';
         break; 
       case 'amountUnitId':
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
    frequencyUnits,
    routes,
    amountUnits
  }
}
const dispatchToProps = (dispatch) => {
  return {
    update: (medication: MedicationInterface) => dispatch(medicationEdit(medication)),
    validate: (data: MedicationInterface) => {
      const result = validateData(data);
      console.log(result);
      if(result.isValid){
          dispatch(viewActions.sendMessage('Medication Saved'));
      } else {
        dispatch(viewActions.sendMessage('Please correct any errors above'));
      }
      
      return result;
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(MedicationItem);