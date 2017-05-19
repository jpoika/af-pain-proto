import OverallPainLevel from '../appcomponents/OverallPainLevel'
import {connect} from 'react-redux';
import {assessSetOverallPain} from '../actions/assessment';
import {checkForUserHighPain} from '../actions/nurse';
import {PainLevelInterface} from '../res/data/pain';
import {AssessmentInterface} from '../res/data/assessments';

const isSaved = (assessmentId, painCategoryId, state) => {
  const {assessments, bodySectionIds,painLevels} = state;
  if(!assessmentId){
    return false;
  }
  if(typeof assessments[assessmentId] === 'undefined'){
    return false;
  }
  if(typeof assessments[assessmentId].painLevels[painCategoryId] === 'undefined'){
    return false;
  }
  return true;
}

const getSavedPain= (assessmentId, painCategoryId, state) => {
  const {assessments, bodySectionIds,painLevels} = state;
  const defaultPainLevelId = 1;
  if(!isSaved(assessmentId, painCategoryId, state)){
    return painLevels[defaultPainLevelId];
  }
  let painLevelId = assessments[assessmentId].painLevels[painCategoryId];
  return painLevels[painLevelId];
}

const stateToProps = (state, ownProps) => {
  const assessmentId = ownProps.assessment.id;
  const painCategoryId = ownProps.categoryId;
  return {
    painLevel: getSavedPain(assessmentId,painCategoryId,state),
    isSaved: isSaved(assessmentId,painCategoryId,state),
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
   selectPain: (assessment:AssessmentInterface, painCategoryId:number, painLevel:PainLevelInterface) => {
     ownProps.checkPain
     if(ownProps.checkPain){
       dispatch(checkForUserHighPain(painLevel, assessment));
     }
     dispatch(assessSetOverallPain(assessment.id, painCategoryId, painLevel.id))
   }
  }
}
export default connect(stateToProps,dispatchToProps)

(OverallPainLevel);


