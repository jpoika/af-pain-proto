import OverviewPage from '../../appcomponents/assessment/AssessmentOverviewPage';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {painCategoryHash} from '../../res/data/pain';

import {assessDelete} from '../../actions/assessment';
const getOveralPainRatings = (assessment,state) => {
    return Object.keys(assessment.painLevels).map((painCategoryId) => {

          let painLevelId = assessment.painLevels[painCategoryId];
          let category = painCategoryHash[painCategoryId];
          return {
            category: category,
            painLevel: state.painLevels[painLevelId]
          }
    });
}
const stateToProps = (state, ownProps) => {
  const assessId = ownProps.params['id'] || '1';
  const assessment = state.assessments[assessId];
  return {
    title: "Assessment",
    page: {title: "Assessment Overview", subtitle: 'Pain Proto', content: ''},
    assessment: assessment,
    overalPainRatings: getOveralPainRatings(assessment,state),
    viewPortSmall: state.device.width < 1200
  }
}
const dispatchToProps = (dispatch) => {
  return {
    deleteAssessment: (assessment) => {
        dispatch(push('/main/account-home'));
        dispatch(assessDelete(assessment.id));
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(OverviewPage);