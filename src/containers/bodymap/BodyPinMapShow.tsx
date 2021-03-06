import BodyMap from '../../appcomponents/bodymap/BodyPinMapShow';
import {connect} from 'react-redux';
import {frontBodySectionIds, backBodySectionIds} from '../../res/data/body';

const frontBodyImage = require('../../res/images/body_map/Front_326.png');
const backBodyImage = require('../../res/images/body_map/Back_326.png');
const getBodySections = (allBodySections,sectionIds) => {
    return sectionIds.map((sid) => {
      return allBodySections[sid]
    });
};

const getSavedPainMarkings = (assessmentId,currentRegion,state) => {
  const {assessments} = state;
  let defaultMarkings = {};
  if(!assessmentId){
    return defaultMarkings;
  }
  if(typeof assessments[assessmentId] === 'undefined'){
    return defaultMarkings;
  }


  //return state.painLevels[savePainLevelId];
  let savedSections = assessments[assessmentId].bodySections;

  let allMarkings =  Object.keys(savedSections)
                  .filter((sectionId) => {
                     return typeof state.bodySections[sectionId] !== 'undefined'
                  })
                  .filter((sectionId) => {
                     let painId = savedSections[sectionId];

                     return typeof state.painLevels[painId] !== 'undefined'
                  })
                  .map((sectionId) => {
                    let painId = savedSections[sectionId];
                    let painLevel = state.painLevels[painId];
                    let bodySection = state.bodySections[sectionId];
                    return {section: bodySection, painLevel};
                  })
                  ;

   return allMarkings.filter((marking) => {
     return marking.section.region === currentRegion;
   });


}


const stateToProps = (state, ownProps) => {
  return {
    title: ownProps.side === 'back' ? 'Pain Map Back':'Pain Map Front',
    bodySections: ownProps.side === 'back' ? getBodySections(state.bodySections,backBodySectionIds) : getBodySections(state.bodySections,frontBodySectionIds),
    bodyImage: ownProps.side === 'back' ? backBodyImage : frontBodyImage,
    painMarkings: getSavedPainMarkings(ownProps.assessment.id,ownProps.side,state)
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {

  }
}
export default connect(stateToProps,dispatchToProps)

(BodyMap);