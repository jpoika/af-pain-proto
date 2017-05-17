import AssessmentList from '../appcomponents/assessment/AssessmentList';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {AssessmentInterface} from '../res/data/assessments';


const stateToProps = (state, ownProps) => {
  return {
    assessments: state.assessmentIds.map(aid => state.assessments[aid]),
    viewPortSmall: state.device.width < 450
  }
}
const dispatchToProps = (dispatch) => {
  return {
    assessmentClicked: (assessment: AssessmentInterface) => {
        dispatch(push('/main/assess-overview/' + assessment.id));
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(AssessmentList);