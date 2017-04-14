import AccountPage from '../appcomponents/AccountPage';

import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {Validators} from '../lib/helpers'
import {flagUserAuthenticated,updateAccountInfo} from '../actions';
import {GenderList} from '../res/data/account'

const validateData = (data) => {
   let isValid = true;
   let errors = Object.keys(data).reduce((acc,propName) => {
     acc[propName] = '';
     switch(propName){
       case 'firstname':
         acc[propName] = !Validators.isString(data[propName]) || !data[propName].length ? 'Required.' : '';
         break;
       case 'lastname':
         acc[propName] = !Validators.isString(data[propName]) || !data[propName].length ? 'Required.' : '';
         break; 
       case 'middlename':
         acc[propName] = !Validators.isString(data[propName]) || !data[propName].length ? 'Required.' : '';
         break;
       case 'dob':
         acc[propName] = !Validators.isNumeric(data[propName])? 'Please enter a valid Date of Birth' : '';
         break;
       case 'gender':
         acc[propName] = !Validators.isNumeric(data[propName])? 'Required' : '';
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
  console.log(GenderList);
  return {
    title: 'Account Settings',
    page: {title: 'Account', subtitle: '', content: ''},
    genders: GenderList
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {

    validate: (data) => {
      console.log(data);
      const result = validateData(data);
      if(result.isValid){
        dispatch(updateAccountInfo(data));
      }
      return result;
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(AccountPage);