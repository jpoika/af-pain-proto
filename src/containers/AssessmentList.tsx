import AssessmentList from '../appcomponents/assessment/AssessmentList';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {AssessmentInterface} from '../res/data/assessments';

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
    assessments: state.assessmentIds.map(aid => state.assessments[aid]),
    viewPortSize: getViewPortSize(state)
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