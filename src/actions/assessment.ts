export const ASSESS_MOVE_STEP = 'T2.ASSESS_MOVE_STEP';
export const ASSESS_MARK_BODY_SECTION_PAIN = 'T2.ASSESS_MARK_BODY_SECTION_PAIN';
export const ASSESS_SET_OVERALL_PAIN = 'T2.ASSESS_SET_OVERALL_PAIN';
export const ASSESS_MOVE_STEP_IF_NEXT = 'T2.ASSESS_MOVE_STEP_IF_NEXT';
export const ASSESS_MARK_COMPLETE = 'T2.ASSESS_MARK_COMPLETE';

export const assessMoveStep = (stepIndex: number,assessmentId: number) => {
  return {
    type: ASSESS_MOVE_STEP,
    stepIndex,
    assessmentId
  }
}

export const assessMoveStepIfNext = (stepIndex: number, assessmentId: number) => {
  return {
    type: ASSESS_MOVE_STEP_IF_NEXT,
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


export const assessMarkPain = (assessmentId: number, bodySectionId: number, painLevelId: number) => {
  return {
    type: ASSESS_MARK_BODY_SECTION_PAIN,
    assessmentId,
    bodySectionId,
    painLevelId
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
