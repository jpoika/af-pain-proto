export const ASSESS_MOVE_STEP = 'T2.ASSESS_MOVE_STEP';
export const ASSESS_MARK_BODY_SECTION_PAIN = 'T2.ASSESS_MARK_BODY_SECTION_PAIN';
export const ASSESS_SET_OVERALL_PAIN = 'T2.ASSESS_SET_OVERALL_PAIN';
export const ASSESS_MOVE_STEP_IF_NEXT = 'T2.ASSESS_MOVE_STEP_IF_NEXT';
export const ASSESS_MARK_COMPLETE = 'T2.ASSESS_MARK_COMPLETE';
export const ASSESSMENT_ADD = 'T2.ASSESSMENT_ADD';
export const ASSESSMENT_EDIT = 'T2.ASSESSMENT_EDIT';

import {scheduleNotification} from './notifications';
import {makeAssessment,AssessmentInterface} from '../res/data/assessments';
import { push } from 'react-router-redux';
import {nextId} from './_helper';

const getLastNonInitialAssessment = (state,type) => {
  return state.assessmentIds
            .map(aid => state.assessments[aid])
            .filter(assess => assess.id !== 1)
            .filter(assess => assess.type === type)
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
  return (dispatch, getState) => {
      dispatch(sheduleReassessment())
      dispatch({
                type: ASSESS_MARK_COMPLETE,
                assessmentId,
                dateTs: date.getTime()
              });
  }
}

export const addAssessmentIfNecessary = (type: string) => {
  return (dispatch,getState) => {
    let lastReAssessment = getLastNonInitialAssessment(getState(),type)
    if(!lastReAssessment || lastReAssessment.isComplete){
      dispatch(addAssessment(type));
    } else {
      console.log('do not need new assess');
    }
  }
}

export const addAssessment = (type: string) => {
  return (dispatch,getState) => {
    return dispatch(
            editAssessment(
              makeAssessment(nextId(getState().assessmentIds),'',type)
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

const makeAssessmentData = (name) => {
  return {
    app: 'af_pain',
    type: 'assessment',
    name
  }
}
export const assessmentNotificationClick = (data) => {
  return (dispatch, getState) => {
    switch (data.name) {
      case "initial":
        dispatch(push('/main/assessment-start'));
        break;
      case "reassessment":
        dispatch(addAssessmentIfNecessary('reassessment'));
        dispatch(push('/main/reassess'));
        break;
    }
  }

}
export const sheduleInitialAssessment = () => {
  let now = new Date();//
  let minutes_from_now = new Date(now.getTime() + 1*60*1000);
  return (dispatch,getState) => {
    console.log('dispatching assessmentSchedule');
       dispatch(scheduleNotification(
          "Initial Pain Assessment",
          "Welcome! When you're ready please begin your initial assessment.",
          minutes_from_now,
          makeAssessmentData('initial')
      ));
  }
}

export const sheduleReassessment = () => {
  let now = new Date();//
  let minutes_from_now = new Date(now.getTime() + 60*60*1000);
  return (dispatch,getState) => {
    console.log('dispatching assessmentSchedule');
       dispatch(scheduleNotification(
          "Pain Reassessment",
          "Hi! Let's take a quick moment to reassess your pain levels.",
          minutes_from_now,
          makeAssessmentData('reassessment')
      ));
  }
}

