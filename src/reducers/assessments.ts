import {frontBodySectionList,backBodySectionList} from '../res/data/body';
import {painLevels as painLevelsRaw} from '../res/data/pain';
import {assessmentPainCategories} from '../res/data/assessments';
import { normalize, schema } from 'normalizr';
import {
  ASSESS_MARK_BODY_SECTION_PAIN, 
  ASSESS_SET_OVERALL_PAIN,
  ASSESS_MARK_COMPLETE,
  ASSESS_MOVE_STEP,
  ASSESSMENT_EDIT
} from '../actions/assessment'

import {arrayPushUnique} from './helpers';
const assessmentRawData = [
    {
      id: 1, 
      bodySections: {},
      painLevels: {},
      step: 0,
      isComplete: false
    }
];

//const assessmentPainCategoriesSchema = new schema.Entity('assessment_pain_categories');
//const assessmentPainCategoriesListSchema = new schema.Array(assessmentPainCategoriesSchema);

const bodySectionSchema = new schema.Entity('bodySections');
const bodySectionListSchema = new schema.Array(bodySectionSchema);

const assessmentSchema = new schema.Entity('assessments');
const assessmentListSchema = new schema.Array(assessmentSchema);

const painLevelsSchema = new schema.Entity('pain_levels');
const painLevelsListSchema = new schema.Array(painLevelsSchema);

const normalizedFrontBodySections = normalize(frontBodySectionList,bodySectionListSchema);
const normalizedAssessments = normalize(assessmentRawData,assessmentListSchema);

const normalizedPainLevels = normalize(painLevelsRaw,painLevelsListSchema);

const systemDefault = {
  lastCompletedAssessment: {
    id: 0,
    completedOn: null
  }
}
export const _lastCompleteAssessment = (state, action: any) => {
  switch (action.type) {
    case ASSESS_MARK_COMPLETE:
      state = {...state, id: action.assessmentId, completedOn: action.dateTs};
      break;
  }
  return state;
}


export const assessmentSystem = (state = systemDefault,action: any) => {
  switch (action.type) {
    case ASSESS_MARK_COMPLETE:
      // code...
      state = {...state,lastCompletedAssessment: _lastCompleteAssessment(state.lastCompletedAssessment,action)}
      break;
    default:
      // code...
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

export const assessments = (state = normalizedAssessments.entities.assessments, action) => {
  switch (action.type) {
    case ASSESS_MARK_COMPLETE:
      state[action.assessmentId] = {...state[action.assessmentId],isComplete: true};
      state = {...state};
      break;
    case ASSESS_MOVE_STEP:
      state[action.assessmentId] = {...state[action.assessmentId],step: action.stepIndex};
      state = {...state};
      break;
    case ASSESS_MARK_BODY_SECTION_PAIN:
    
      let assessId = action.assessmentId;
      let sectionId = action.bodySectionId;
  
      let bodySections = {...state[assessId].bodySections,[sectionId]: action.painLevelId};
      state[assessId] = {...state[assessId],bodySections: bodySections};
      state = {...state};
      break;
    case ASSESS_SET_OVERALL_PAIN:
      let op_assessId = action.assessmentId;
      let op_painCategoryId = action.painCategoryId;
   
      let newPainLevels = {...state[op_assessId].painLevels,[op_painCategoryId]: action.painLevelId};
      state[op_assessId] = {...state[op_assessId],painLevels: newPainLevels};
      state = {...state};
      break;
    case ASSESSMENT_EDIT:
      state = {...state,[action.assessment.id]: action.assessment};
    break;
  }
  return state;
}

export const assessmentIds = (state = normalizedAssessments.result,action: any) => {
  switch(action.type){
    case ASSESSMENT_EDIT:
      state = arrayPushUnique(action.assessment.id,state);
      break;
  }
  return state;
}

export const frontBodySections = (state = normalizedFrontBodySections.entities.bodySections,action: any) => {
 return state;
}

export const frontBodySectionIds = (state = normalizedFrontBodySections.result,action: any) => {
  return state;
}



