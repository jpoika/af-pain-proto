import BodySection from '../appcomponents/BodySection';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
const getSavedPainMarking = (assessmentId, sectionId, state) => {
  const {assessments, bodySectionIds} = state;
  let defaultPainLevelId = 1;
  let defaultPainLevel = state.painLevels[defaultPainLevelId];
  if(!assessmentId){
    return defaultPainLevel;
  }
  if(typeof assessments[assessmentId] === 'undefined'){
    return defaultPainLevel;
  }
  if(typeof assessments[assessmentId].bodySections[sectionId] === 'undefined'){
    return defaultPainLevel;
  }
  let savePainLevelId = assessments[assessmentId].bodySections[sectionId];


  return state.painLevels[savePainLevelId];
}

const stateToProps = (state, ownProps) => {
  const assessmentId = ownProps.assessmentId;
  const sectionId = ownProps.section.id;

  return {
    savedPain: getSavedPainMarking(assessmentId,sectionId,state)
  }
}
const dispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(stateToProps,dispatchToProps)

(BodySection);