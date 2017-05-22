import MedicationList from '../../appcomponents/medication-view/MedicationList';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {AssessmentInterface} from '../../res/data/assessments';

const getViewPortSize = (state) => {
  const width = state.device.width;
  if(width < 450){
    return 'small';
  }  
  if(width >= 450 && width <= 1000){
    return 'medium';
  }
  return 'large';
}

const stateToProps = (state, ownProps) => {
  return {
    medications: state.medicationIds.map(mid => state.medications[mid]),
    viewPortSize: getViewPortSize(state)
  }
}
const dispatchToProps = (dispatch) => {
  return {
    editClick: () => dispatch(push('/main/mtracker'))
  }
}
export default connect(stateToProps,dispatchToProps)

(MedicationList);