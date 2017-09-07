import AssessmentList from '../../appcomponents/assessment/AssessmentList';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
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
  const now = new Date();
  const nowTimestamp = now.getTime();
  return {
    assessments: state.assessmentIds.map(aid => state.assessments[aid]),
    viewPortSize: getViewPortSize(state),
    isReassessmentDue: state.assessmentSystem.nextDeadline < nowTimestamp
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  console.log(ownProps);
  return {
    assessmentClicked: (assessment: AssessmentInterface) => {
        ownProps.history.push('/main/assess-overview/' + assessment.id);
    }
  }
}
export default withRouter(connect(stateToProps,dispatchToProps)
(AssessmentList));