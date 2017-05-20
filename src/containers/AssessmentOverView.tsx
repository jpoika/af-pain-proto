import Overview from '../appcomponents/assessment/AssessmentOverview';
import {homePage} from '../res/data/page';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {painCategoryHash} from '../res/data/pain';

import {deleteAccount} from '../actions'
import {assessDelete} from '../actions/assessment';
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
  return {
    assessment: ownProps.assessment,
    overalPainRatings: getOveralPainRatings(ownProps.assessment,state),
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

(Overview);