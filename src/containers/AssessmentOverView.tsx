import Overview from '../appcomponents/assessment/AssessmentOverview';
import {homePage} from '../res/data/page';
import {connect} from 'react-redux';
import {painCategoryHash} from '../res/data/pain';

import {deleteAccount} from '../actions'
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
    assessment: assessment,
    overalPainRatings: getOveralPainRatings(assessment,state)
  }
}
const dispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(stateToProps,dispatchToProps)

(Overview);