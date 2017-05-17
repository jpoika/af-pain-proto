import PainExplanationButton from '../appcomponents/PainExplanationButton';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { assessMarkPain } from '../actions/assessment';


const stateToProps = (state, ownProps) => {
  const initAssessmentId = 1;
  return {
    painLevels: state.painLevelIds.map(pid => state.painLevels[pid + ''])
  }
}
const dispatchToProps = (dispatch) => {
  return {
    
  }
}
export default connect(stateToProps,dispatchToProps)

(PainExplanationButton);