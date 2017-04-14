import LoginPage from '../appcomponents/LoginPage';

import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {Validators} from '../lib/helpers'
import {flagUserAuthenticated,setUsername} from '../actions';

const validateData = (data) => {
   let isValid = true;
   let errors = Object.keys(data).reduce((acc,propName) => {
     acc[propName] = '';
     switch(propName){
       case 'username':
         acc[propName] = !Validators.isEmail(data[propName]) ? 'Please enter a valid email.' : '';
         break;
       case 'password':
         acc[propName] = !Validators.isString(data[propName]) || !data[propName].length ? 'Please enter a valid password.' : '';
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
    title: 'Pain Proto',
    page: {title: 'Login', subtitle: '', content: ''},

  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    onCancelClick: (event: any) => {
      ownProps.pathOnTouchTap('/')(event);
    },
    validate: (data) => {
      console.log(data);
      const result = validateData(data);
      if(result.isValid){
        dispatch(flagUserAuthenticated());
        dispatch(setUsername(data.username))
        dispatch(push('/main/settings'))
      }
      return result;
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(LoginPage);