import AllergiesManager from '../appcomponents/AllergiesManager';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { allergyAddBlank ,allergyRemove} from '../actions/allergy';


const stateToProps = (state, ownProps) => {
  return {
    allergies: state.allergyIds.map(mid => state.allergies[mid + ''])
  }
}
const dispatchToProps = (dispatch) => {
  return {
    addAllergy: () => dispatch(allergyAddBlank()),
    deleteAllergy: (id: number) => dispatch(allergyRemove(id))
  }
}
export default connect(stateToProps,dispatchToProps)

(AllergiesManager);