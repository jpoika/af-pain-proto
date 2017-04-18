export const ASSESS_MOVE_STEP = 'T2.ASSESS_MOVE_STEP';
export const ASSESS_MARK_BODY_SECTION_PAIN = 'T2.ASSESS_MARK_BODY_SECTION_PAIN';
export const ASSESS_SET_OVERALL_PAIN = 'T2.ASSESS_SET_OVERALL_PAIN';

export const assessMoveStep = (stepIndex: number) => {
  return {
    type: ASSESS_MOVE_STEP,
    stepIndex
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