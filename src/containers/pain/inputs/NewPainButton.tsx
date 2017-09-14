import NewPainButton from '../../../appcomponents/pain/inputs/NewPainButton';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';



const stateToProps = (state, ownProps) => {
  return {
    initAssessmentComplete: typeof state.assessments['1'] !== 'undefined' && state.assessments['1'].isComplete ? true : false
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    newPainClick: (event) => {
        event.preventDefault();
        event.stopPropagation();
        ownProps.history.push('/main/newpain');
    },
    initAssessClick: (event) => {
        event.preventDefault();
        event.stopPropagation();
        ownProps.history.push('/main/assessment-start');
    }
  }
}
export default withRouter(connect(stateToProps,dispatchToProps)

(NewPainButton));