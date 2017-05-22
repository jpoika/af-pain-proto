import UserOverview from '../../appcomponents/user/UserOverview';
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
    user: state.user,
    viewPortSize: getViewPortSize(state)
  }
}
const dispatchToProps = (dispatch) => {
  return {
    editClick: () => dispatch(push('/main/settings'))
  }
}
export default connect(stateToProps,dispatchToProps)

(UserOverview);