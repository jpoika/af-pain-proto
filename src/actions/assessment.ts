export const ASSESS_MOVE_STEP = 'T2.ASSESS_MOVE_STEP';
export const ASSESS_MARK_BODY_SECTION_PAIN = 'T2.ASSESS_MARK_BODY_SECTION_PAIN';
export const ASSESS_SET_OVERALL_PAIN = 'T2.ASSESS_SET_OVERALL_PAIN';
export const ASSESS_MOVE_STEP_IF_NEXT = 'T2.ASSESS_MOVE_STEP_IF_NEXT';
export const ASSESS_MARK_COMPLETE = 'T2.ASSESS_MARK_COMPLETE';
export const ASSESSMENT_ADD = 'T2.ASSESSMENT_ADD';
export const ASSESSMENT_EDIT = 'T2.ASSESSMENT_EDIT';

import {makeAssessment,AssessmentInterface} from '../res/data/assessments';
import {nextId} from './_helper';

const getLastNonInitialAssessment = (state) => {
  return state.assessmentIds
            .map(aid => state.assessments[aid])
            .filter(assess => assess.id !== 1)
            .pop()
            ;
}

export const assessMoveStep = (stepIndex: number,assessmentId: number) => {
  return {
    type: ASSESS_MOVE_STEP,
    stepIndex,
    assessmentId
  }
}


export const assessMarkComplete = (assessmentId: number) => {
  let date = new Date();

  return {
    type: ASSESS_MARK_COMPLETE,
    assessmentId,
    dateTs: date.getTime()
  }
}

export const addAssessmentIfNecessary = () => {
  return (dispatch,getState) => {
    let lastReAssessment = getLastNonInitialAssessment(getState())
    if(!lastReAssessment || lastReAssessment.isComplete){
      console.log('YESS assess');
      dispatch(addAssessment());
    } else {
      console.log('do not need new assess');
    }
  }
}

export const addAssessment = () => {
  return (dispatch,getState) => {
    return dispatch(
            editAssessment(
              makeAssessment(nextId(getState().assessmentIds))
            )
          );
  }
}

export const editAssessment = (assessment:AssessmentInterface) => {
  return {
    type: ASSESSMENT_EDIT,
    assessment
  }
}


export const assessMarkPain = (assessmentId: number, side:string, bodySectionId: number, painLevelId: number) => {
  return {
    type: ASSESS_MARK_BODY_SECTION_PAIN,
    assessmentId,
    bodySectionId,
    painLevelId,
    side
  }
}

export const assessSetOverallPain = (assessmentId: number, painCategoryId: number, painLevelId: number) => {
  return {
    type: ASSESS_SET_OVERALL_PAIN,
    assessmentId,
    painCategoryId,
    painLevelId
  }
}
