import MedicationList from '../../appcomponents/medication-view/MedicationList';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

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
const dispatchToProps = (dispatch,ownProps) => {
  return {
    editClick: () => {
      ownProps.history.push('/main/mtracker')
    }
  }
}
export default withRouter(connect(stateToProps,dispatchToProps)

(MedicationList));