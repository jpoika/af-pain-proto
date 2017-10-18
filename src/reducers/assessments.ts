import {bodySectionList} from '../res/data/body';
import {painLevels as painLevelsRaw} from '../res/data/pain';
import {makeAssessment} from '../res/data/assessments';
import { normalize, schema } from 'normalizr';
import {
  ASSESS_MARK_BODY_SECTION_PAIN, 
  ASSESSMENT_EDIT,
  ASSESS_REMOVE_BODY_SECTION_PAIN,
  ASSESSMENT_DELETE,
  ASSESSMENT_NEXT_REASSESS_DEADLINE
} from '../actions/assessment'

import {arrayPushUnique, arrayRemove} from './_helpers';
const assessmentRawData = [
    makeAssessment(1,'','initial'),
];

const bodySectionSchema = new schema.Entity('bodySections');
const bodySectionListSchema = new schema.Array(bodySectionSchema);

const assessmentSchema = new schema.Entity('assessments');
const assessmentListSchema = new schema.Array(assessmentSchema);

const painLevelsSchema = new schema.Entity('pain_levels');
const painLevelsListSchema = new schema.Array(painLevelsSchema);

const normalizedBodySections = normalize(bodySectionList,bodySectionListSchema);


//const normalizedAssessments = normalize(assessmentRawData,assessmentListSchema);

const getNormalizedAssessments = () => normalize(assessmentRawData,assessmentListSchema);

const normalizedPainLevels = normalize(painLevelsRaw,painLevelsListSchema);




const systemDefault = {
  nextDeadline: null
}


export const assessmentSystem = (state = systemDefault,action: any) => {
  switch (action.type) {
    case ASSESSMENT_NEXT_REASSESS_DEADLINE:
      state = {...state,nextDeadline: action.deadline}
      break;
  }
  return state;
}


export const painLevels = (state = normalizedPainLevels.entities.pain_levels,action: any) => {
 return state;
}

export const painLevelIds = (state = normalizedPainLevels.result,action: any) => {
  return state;
}
//let hasSet = false;
export const assessments = (state = getNormalizedAssessments().entities.assessments, action) => {
  // if(action.type === '@123321' || hasSet){
  //     console.log(state['1']);
  //     console.log(getNormalizedAssessments().entities.assessments['1']);
  //     hasSet = true;
  // }
  
  switch (action.type) {
    case ASSESS_MARK_BODY_SECTION_PAIN:
    
      let assessId = action.assessmentId;
      let sectionId = action.bodySectionId;
      
      let bodySections = {...state[assessId].bodySections,[sectionId]: action.painLevelId};
      state[assessId] = {...state[assessId],bodySections: bodySections};
 

      state = {...state};
      break;
    case ASSESS_REMOVE_BODY_SECTION_PAIN:
      delete state[action.assessmentId].bodySections[action.bodySectionId];
      state = {...state};
      break;
    case ASSESSMENT_EDIT:
      state = {...state,[action.assessment.id]: action.assessment};
      break;
    case ASSESSMENT_DELETE:
      delete state[action.assessmentId];
      state = {...state};
      break;
  }
  return state;
}

export const assessmentIds = (state = getNormalizedAssessments().result,action: any) => {
  switch(action.type){
    case ASSESSMENT_EDIT:
      state = arrayPushUnique(action.assessment.id,state);
      break;
    case ASSESSMENT_DELETE:
      state = arrayRemove(action.assessmentId,state);
      break;
  }
  return state;
}

export const bodySections = (state = normalizedBodySections.entities.bodySections,action: any) => {
 return state;
}

export const bodySectionIds = (state = normalizedBodySections.result,action: any) => {
  return state;
}



