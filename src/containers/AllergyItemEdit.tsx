import AllergyItemEdit from '../appcomponents/AllergyItemEdit';
import {AllergyInterface} from '../res/data/allergy';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { allergyAddBlank,allergyRemove,allergyEdit} from '../actions/allergy';
import {Validators} from '../lib/helpers'

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
  }
}
const dispatchToProps = (dispatch) => {
  return {
    update: (allergy: AllergyInterface) => dispatch(allergyEdit(allergy)),
    validate: (data: AllergyInterface) => {
      const result = validateData(data);
      console.log(result);
      return result;
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(AllergyItemEdit);