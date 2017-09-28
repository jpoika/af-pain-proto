import AssessmentList from '../../appcomponents/assessment/AssessmentList';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {AssessmentInterface} from '../../res/data/assessments';
import {getAssessements} from './selectors'

const getViewPortSize = (ownProps) => {
  const width = ownProps.appPage.screen.width;

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
    assessments: getAssessements(state,ownProps),
    viewPortSize: getViewPortSize(ownProps),
    isReassessmentDue: state.assessmentSystem.nextDeadline < nowTimestamp
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    assessmentClicked: (assessment: AssessmentInterface) => {
        ownProps.history.push('/main/assess-overview/' + assessment.id);
    }
  }
}
export default withRouter(connect(stateToProps,dispatchToProps)
(AssessmentList));