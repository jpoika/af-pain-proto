import AccountPage from '../../appcomponents/pages/UserSettingsPage';
import {connect} from 'react-redux';
import {Validators} from '../../lib/helpers'
import {updateAccountInfo} from '../../actions';
import {GenderList /*,AccountInterface */} from '../../res/data/account'
import {assessMoveStep} from '../../actions/assessment';
import {viewActions} from '../../lib/local-t2-view';

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
         acc[propName] = ''; //not required
         break;
       case 'dob':
         acc[propName] = !Validators.isNumeric(data[propName]) || data[propName] === -1? 'Please enter a valid Date of Birth' : '';
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

// const gatherAccountInfo = (userInfo):AccountInterface => {
//   console.log(userInfo);
//   return {
//     firstname: userInfo.firstname,
//     middlename: userInfo.middlename,
//     lastname: userInfo.lastname,
//     gender: userInfo.gender,
//     dob: userInfo.dob
//   }
// }
const stateToProps = (state, ownProps) => {
  console.log(state.user);
  return {
    page: {title: 'Account', subtitle: '', content: ''},
    genders: GenderList,
    savedAccount: state.user
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {

    validate: (data) => {
      const result = validateData(data);
      if(result.isValid){
        dispatch(updateAccountInfo(data));
        dispatch(viewActions.sendMessage('Account Info Saved'));
        dispatch(assessMoveStep(1,1));
      } else {
        dispatch(viewActions.sendMessage('Please correct any errors above'));
      }
      return result;
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(AccountPage);