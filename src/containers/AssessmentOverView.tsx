import Overview from '../appcomponents/assessment/AssessmentOverview';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {painCategoryHash} from '../res/data/pain';
import {assessDelete} from '../actions/assessment';
const getOveralPainRatings = (assessment,state) => {
    return Object.keys(assessment.painLevels).map((painCategoryId) => {

          let painLevelId = assessment.painLevels[painCategoryId];
          console.log(painCategoryId);
          console.log(painCategoryHash);
          let category = painCategoryHash[painCategoryId];
          return {
            category: category,
            painLevel: state.painLevels[painLevelId]
          }
    });
}
const stateToProps = (state, ownProps) => {
  console.log(ownProps.assessment.type);
  return {
    assessment: ownProps.assessment,
    overalPainRatings: getOveralPainRatings(ownProps.assessment,state),
    viewPortSmall: state.device.width < 1200
  }
}
const dispatchToProps = (dispatch, ownProps) => {
  return {
    deleteAssessment: (assessment) => {
        
        ownProps.history.push('/main/account-home');
        dispatch(assessDelete(assessment.id));
    },

    editAssessment: (assessment) => {
        if(assessment.type === 'newpain'){
          ownProps.history.push('/main/newpain');
        } else if (assessment.type === 'reassessment'){
          ownProps.history.push('/main/reassess');
        } else if(assessment.type === 'initial'){
          ownProps.history.push('/main/assessment-start');
        }
    }
  }
}
export default withRouter(connect(stateToProps,dispatchToProps)(Overview));