import {messagePromptUser} from './messages';
export const ASSESS_MARK_BODY_SECTION_PAIN = 'T2.ASSESS_MARK_BODY_SECTION_PAIN';
export const ASSESS_REMOVE_BODY_SECTION_PAIN = 'T2.ASSESS_REMOVE_BODY_SECTION_PAIN';
export const ASSESS_MOVE_STEP_IF_NEXT = 'T2.ASSESS_MOVE_STEP_IF_NEXT';
export const ASSESSMENT_ADD = 'T2.ASSESSMENT_ADD';
export const ASSESSMENT_EDIT = 'T2.ASSESSMENT_EDIT';
export const ASSESSMENT_SET_NEW_PAIN = 'T2.ASSESSMENT_SET_NEW_PAIN';
export const ASSESSMENT_DELETE = 'T2.ASSESSMENT_DELETE';
export const ASSESSMENT_NEXT_REASSESS_DEADLINE = 'T2.ASSESSMENT_NEXT_REASSESS_DEADLINE';
import {clearNurseAlert} from './nurse';
import {scheduleNotification} from './notifications';
import {AssessmentInterface} from '../res/data/assessments';
import {getPreviousCompletedAssessment} from '../containers/assessment/selectors';

import {nextId} from './_helper';
const messsageNewPain = [
        "You've indicated you are experiencing pain in a new location.", 
        "Would you like to speak to a nurse?"
    ];

const severePain = [
        "Are you experiencing severe pain?"
];

// const getLastNonInitialAssessment = (state,type): AssessmentInterface => {
//   return state.assessmentIds
//             .map(aid => state.assessments[aid])
//             .filter(assess => assess.id !== 1)
//             .filter(assess => assess.type === type)
//             .pop()
//             ;
// }

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


export const assessMoveStep = (stepIndex: number,assessment: AssessmentInterface) => {
  return editAssessment(assessment, {step: stepIndex});
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


export const assessMarkComplete = (assessment: AssessmentInterface,status: number = null) => {

  return (dispatch, getState) => {
      dispatch(sheduleReassessment())
      dispatch(markComplete(assessment,status));
  }
}

export const markComplete = (assessment: AssessmentInterface, status: number = null) => {
  let date = new Date();
  return editAssessment(assessment,
                        {
                          status: status,
                          isComplete: true,
                          completedOn: date.getTime()
                        });
}

export const editAssessment = (assessment:AssessmentInterface,newProps) => {

  return (dispatch,getState) => {
    if(!assessment.id){
      assessment.id = nextId(getState().assessmentIds);
    }
    Object.assign(assessment,newProps);
    return dispatch(
            {
              type: ASSESSMENT_EDIT,
              assessment
             }
          );

  }
}
export const assessmentCopyLastPain = (assessment: AssessmentInterface) => {
  return (dispatch,getState) => {
    const lastAssessment = getPreviousCompletedAssessment(assessment)(getState(),{});
    if(assessment.id !== lastAssessment.id){
      dispatch(editAssessment(assessment,
                        {
                          bodySections: lastAssessment.bodySections,
                          painLevels: lastAssessment.painLevels
                        }));
    }
  }
}
//TODO replace with editAssessment?
export const assessMarkPain = (assessmentId: number, side:string, bodySectionId: number, painLevelId: number) => {
  return {
    type: ASSESS_MARK_BODY_SECTION_PAIN,
    assessmentId,
    bodySectionId,
    painLevelId,
    side
  }
}
//TODO replace with editAssessment?
export const assessmentRemoveBodyPain = (assessmentId: number,bodySectionId: number) => {
  
  return {
    type: ASSESS_REMOVE_BODY_SECTION_PAIN,
    assessmentId,
    bodySectionId
  }
}
export const assessSetOverallPain = (assessment: AssessmentInterface, painCategoryId: number, painLevelId: number) => {
      
  let newPainLevels = {...assessment.painLevels,[painCategoryId]: painLevelId};
  return editAssessment(assessment,{
      painLevels: newPainLevels
  });

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

export const assessmentReportSeverePain = (assessment: AssessmentInterface) => {
  return messagePromptUser('severe_pain_' + assessment.id,'severe_pain_assess_prompt',1,severePain)
}

export const assessmentPromptSeverePain = (assessment: AssessmentInterface) => {

  return (dispatch,getState) => {
      dispatch(editAssessment(assessment,{})); //make sure assessment has id before prompt is created
      dispatch(messagePromptUser('severe_pain_' + assessment.id,'severe_pain_assess_prompt',1,severePain));
  }
}

