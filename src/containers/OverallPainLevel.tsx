import OverallPainLevel from '../appcomponents/OverallPainLevel'
import {connect} from 'react-redux';
import { assessSetOverallPain } from '../actions/assessment';
import {PainLevelInterface} from '../res/data/pain';

const getSavedPain= (assessmentId, painCategoryId, state) => {
  const {assessments, bodySectionIds,painLevels} = state;
  const defaultPainLevelId = 1;
  if(!assessmentId){
    return painLevels[defaultPainLevelId];
  }
  if(typeof assessments[assessmentId] === 'undefined'){
    return painLevels[defaultPainLevelId];
  }
  if(typeof assessments[assessmentId].painLevels[painCategoryId] === 'undefined'){
    return painLevels[defaultPainLevelId];
  }
  let painLevelId = assessments[assessmentId].painLevels[painCategoryId];
  return painLevels[painLevelId];
}


const stateToProps = (state, ownProps) => {
  const assessmentId = ownProps.assessmentId;
  const painCategoryId = ownProps.categoryId;
  return {
    painLevel: getSavedPain(assessmentId,painCategoryId,state)
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
   selectPain: (assessmentId:number, painCategoryId:number, painLevel:PainLevelInterface) => {
     dispatch(assessSetOverallPain(assessmentId,painCategoryId,painLevel.id))
   }
  }
}
export default connect(stateToProps,dispatchToProps)

(OverallPainLevel);


