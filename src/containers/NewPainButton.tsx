import NewPainButton from '../appcomponents/NewPainButton';
import {homePage} from '../res/data/page';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {addAssessmentIfNecessary} from '../actions/assessment';

const stateToProps = (state, ownProps) => {
  return {
    initAssessmentComplete: typeof state.assessments['1'] !== 'undefined' && state.assessments['1'].isComplete ? true : false
  }
}
const dispatchToProps = (dispatch) => {
  return {
    newPainClick: () => {
        dispatch(addAssessmentIfNecessary('newpain'));
        dispatch(push('/main/newpain'));
    },
    initAssessClick: () => {
        dispatch(push('/main/assessment-start'));
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(NewPainButton);