import {messagePromptUser} from './messages';
export const ASSESS_MOVE_STEP = 'T2.ASSESS_MOVE_STEP';
export const ASSESS_MARK_BODY_SECTION_PAIN = 'T2.ASSESS_MARK_BODY_SECTION_PAIN';
export const ASSESS_REMOVE_BODY_SECTION_PAIN = 'T2.ASSESS_REMOVE_BODY_SECTION_PAIN';
export const ASSESS_SET_OVERALL_PAIN = 'T2.ASSESS_SET_OVERALL_PAIN';
export const ASSESS_MOVE_STEP_IF_NEXT = 'T2.ASSESS_MOVE_STEP_IF_NEXT';
export const ASSESS_MARK_COMPLETE = 'T2.ASSESS_MARK_COMPLETE';
export const ASSESSMENT_ADD = 'T2.ASSESSMENT_ADD';
export const ASSESSMENT_EDIT = 'T2.ASSESSMENT_EDIT';
export const ASSESSMENT_SET_NEW_PAIN = 'T2.ASSESSMENT_SET_NEW_PAIN';
export const ASSESSMENT_DELETE = 'T2.ASSESSMENT_DELETE';
export const ASSESSMENT_NEXT_REASSESS_DEADLINE = 'T2.ASSESSMENT_NEXT_REASSESS_DEADLINE';
import {clearNurseAlert} from './nurse';
import {scheduleNotification} from './notifications';
import {makeAssessment,AssessmentInterface} from '../res/data/assessments';

import {nextId} from './_helper';
const messsageNewPain = [
        "You've indicated you are experiencing pain in a new location.", 
        "Would you like to speak to a nurse?"
    ];
const getLastNonInitialAssessment = (state,type): AssessmentInterface => {
  return state.assessmentIds
            .map(aid => state.assessments[aid])
            .filter(assess => assess.id !== 1)
            .filter(assess => assess.type === type)
            .pop()
            ;
}

const getLastCompleteAssessment = (state,type = ''): AssessmentInterface => {
  return state.assessmentIds
            .map(aid => state.assessments[aid])
            .filter(assess => !type || assess.type === type )
            .filter(assess =>  assess.isComplete )
            .pop()
            ;
}

const getDiffBodySections = (sections1: {[propName: string]: any},sections2: {[propName: string]: any}) => {
   const currentBodySectionIds = Object.keys(sections1).map(sectionId => sectionId);
   return currentBodySectionIds.filter(bsId => typeof sections2[bsId] === 'undefined');
}


export const assessMoveStep = (stepIndex: number,assessmentId: number) => {
  return {
    type: ASSESS_MOVE_STEP,
    stepIndex,
    assessmentId
  }
}

export const assessDelete = (assessmentId: number) => {
  return {
    type: ASSESSMENT_DELETE,
    assessmentId
  }
}

export const checkForNewPain = (currentAssessmentId: number,region: string) => {
  return (dispatch,getState) => {
    const lastAssessment = getLastCompleteAssessment(getState());
    let newPainSectionIds = [];

    let currentAssessment = getState().assessments[currentAssessmentId];

    if(currentAssessment && lastAssessment && lastAssessment.id !== currentAssessment.id){
      newPainSectionIds = getDiffBodySections(currentAssessment.bodySections,lastAssessment.bodySections);
      

      if(newPainSectionIds.length){
        dispatch(clearNurseAlert());
        dispatch(messagePromptUser('new_pain_' + region + '_' + currentAssessmentId,'nurse_prompt',1,messsageNewPain));
      }


      dispatch(setNewPain(currentAssessment,newPainSectionIds));
    }
  }
}

export const setNewPain = (currentAssessment: AssessmentInterface, newPainSectionIds: string[]) => {
  return {
    type:  ASSESSMENT_SET_NEW_PAIN,
    assessmentId: currentAssessment.id,
    newPainSectionIds
  }
}


export const assessMarkComplete = (assessmentId: number,status: number = null) => {

  return (dispatch, getState) => {
      dispatch(sheduleReassessment())
      dispatch(markComplete(assessmentId,status));
  }
}

export const markComplete = (assessmentId: number,status: number = null) => {
  let date = new Date();
  return {
        type: ASSESS_MARK_COMPLETE,
        assessmentId,
        dateTs: date.getTime(),
        status
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

  return (dispatch,getState) => {
    if(assessment.id){
      return dispatch(
              {
                type: ASSESSMENT_EDIT,
                assessment
               }
            );
    } else {
      console.log("Assessment submitted for edit without a set id");
    }

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

export const assessmentRemoveBodyPain = (assessmentId: number,bodySectionId: number) => {
  
  return {
    type: ASSESS_REMOVE_BODY_SECTION_PAIN,
    assessmentId,
    bodySectionId
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

export const sheduleInitialAssessment = () => {
  let now = new Date();//
  let minutes_from_now = new Date(now.getTime() + 1*60*1000);
  return (dispatch,getState) => {
       dispatch(scheduleNotification(
          "Initial Pain Assessment",
          "Welcome! When you're ready please begin your initial assessment.",
          minutes_from_now,
          makeAssessmentData('initial')
      ));
  }
}

export const scheduleReassessmentDeadline = (deadline: Date = null) => {
  let now = new Date();//
  let finalDeadline = deadline || new Date(now.getTime() + 2*60*1000);
  return {
    type: ASSESSMENT_NEXT_REASSESS_DEADLINE,
    deadline: finalDeadline.getTime()
  }
}

export const sheduleReassessment = () => {
  let now = new Date();//
  let minutes_from_now = new Date(now.getTime() + 2*60*1000);
  return (dispatch,getState) => {
       dispatch(scheduleReassessmentDeadline(minutes_from_now));
       dispatch(scheduleNotification(
          "Pain Reassessment",
          "Hi! Let's take a quick moment to reassess your pain levels.",
          minutes_from_now,
          makeAssessmentData('reassessment')
      ));
  }
}

