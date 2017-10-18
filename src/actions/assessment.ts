import {messagePromptUser} from './messages';
export const ASSESS_MARK_BODY_SECTION_PAIN = 'T2.ASSESS_MARK_BODY_SECTION_PAIN';
export const ASSESS_REMOVE_BODY_SECTION_PAIN = 'T2.ASSESS_REMOVE_BODY_SECTION_PAIN';
export const ASSESS_MOVE_STEP_IF_NEXT = 'T2.ASSESS_MOVE_STEP_IF_NEXT';
export const ASSESSMENT_ADD = 'T2.ASSESSMENT_ADD';
export const ASSESSMENT_EDIT = 'T2.ASSESSMENT_EDIT';
export const ASSESSMENT_DELETE = 'T2.ASSESSMENT_DELETE';
export const ASSESSMENT_NEXT_REASSESS_DEADLINE = 'T2.ASSESSMENT_NEXT_REASSESS_DEADLINE';

import {scheduleNotification} from './notifications';
import {AssessmentInterface} from '../res/data/assessments';
import {getPreviousCompletedAssessment} from '../containers/assessment/selectors';
import {PainLevelInterface} from '../res/data/pain'

import {nextId} from './_helper';

const severePain = [
        "Are you experiencing severe pain?"
];

const decreasedPain = [
        "It appears you pain level may have improved.",
        "Please select what has helped to decrease your pain?"

];

export const getLocationsPainDecreased = (currentAssessment: AssessmentInterface, prevAssessment: AssessmentInterface, painLevels: PainLevelInterface[]): number[] => {
  const decreasedPainLocations = [];

  Object.keys(currentAssessment.bodySections).forEach((bodySectionId,i) => {
    const currentBodySectionPainLevelId = currentAssessment.bodySections[bodySectionId];
   
    if(typeof prevAssessment.bodySections[bodySectionId] !== 'undefined'){
      const lastBodySectionPainLevelId = prevAssessment.bodySections[bodySectionId];
     
      const currentBodySectionPainLevel = painLevels[currentBodySectionPainLevelId+ '']
      const lastBodySectionPainLevel = painLevels[lastBodySectionPainLevelId + '']

      if(lastBodySectionPainLevel.level > currentBodySectionPainLevel.level){
        decreasedPainLocations.push(bodySectionId);
      }
    }
  });
  return decreasedPainLocations;
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
    dispatch(
            {
              type: ASSESSMENT_EDIT,
              assessment
             }
          );
    return Promise.resolve(assessment);
  }
}
export const assessmentCopyLastPain = (assessment: AssessmentInterface) => {
  return (dispatch,getState) => {
    const lastAssessment = getPreviousCompletedAssessment(assessment)(getState(),{});
    if(lastAssessment && assessment.id !== lastAssessment.id){
      dispatch(editAssessment(assessment,
                        {
                          bodySections: lastAssessment.bodySections,
                          painLevels: lastAssessment.painLevels
                        }));
    }
  }
}

export const assessMarkPain = (assessment: AssessmentInterface,bodySectionId: number, painLevelId: number) => {
  //TODO //BOOKMARK
  const newBodySections = {...assessment.bodySections,[bodySectionId]: painLevelId};
  return editAssessment(assessment,{
      bodySections: newBodySections
  });
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
  let minutes_from_now = new Date(now.getTime() + 1 * 60*1000);
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

  return (dispatch,getState,extraArgs) => {
    const intervalMs = extraArgs.appConfig.notifications.interval;
    let now = new Date();
    let finalDeadline = deadline || new Date(now.getTime() + intervalMs);
    dispatch(
      {
        type: ASSESSMENT_NEXT_REASSESS_DEADLINE,
        deadline: finalDeadline.getTime()
      }
    );
    return Promise.resolve(finalDeadline);
  }
}

export const sheduleReassessment = () => {

  return (dispatch,getState,extraArgs) => {
       const intervalMs = extraArgs.appConfig.notifications.interval;
       let now = new Date();//
       let minutes_from_now = new Date(now.getTime() + intervalMs);
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

export const assessmentCheckForPainDecrease = (assessment: AssessmentInterface) => {
  return (dispatch,getState) => {
    const lastAssessment = getPreviousCompletedAssessment(assessment)(getState(),{});
    if(lastAssessment){
      const decreasedPainBodySectionIds = getLocationsPainDecreased(assessment,lastAssessment,getState().painLevels);

      if(decreasedPainBodySectionIds.length > 0){
         decreasedPainBodySectionIds.map((bsId) => {
           dispatch(messagePromptUser('pain_decrease_location_' + assessment.id + '_' + bsId,'pain_location_decreased_prompt',1,decreasedPain));
         })
      }
    }
  }
}

