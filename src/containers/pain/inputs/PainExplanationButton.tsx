import PainExplanationButton from '../../../appcomponents/pain/inputs/PainExplanationButton';
import {connect} from 'react-redux';


const stateToProps = (state, ownProps) => {
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