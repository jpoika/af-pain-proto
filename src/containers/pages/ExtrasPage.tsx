import ExtrasPage from '../../appcomponents/pages/ExtrasPage';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';

const completedAssessments = (state): any[] => {
  return state.assessmentIds.map(aid => state.assessments[aid]).filter(assess => assess.isComplete);
}

const stateToProps = (state, ownProps) => {
  return {
    title: 'Extras',
    page: {title: 'Extras', subtitle: 'Pain Proto', content: ''}
  }
}
const dispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(stateToProps,dispatchToProps)

(ExtrasPage);