import {PainLevelInterface, PainLevelsObject} from '../res/data/pain';
import {AssessmentInterface} from '../res/data/assessments';
import {messagePromptUser,messageCreate} from './messages'
export const ALERT_NURSE = 'T2.ALERT_NURSE';
export const ALERT_NURSE_START = 'T2.ALERT_NURSE_START';
export const ALERT_NURSE_END = 'T2.ALERT_NURSE_END';
export const ALERT_NURSE_TIMEOUT= 'T2.ALERT_NURSE_TIMEOUT';
export const ALERT_NURSE_CLEAR = 'T2.ALERT_NURSE_CLEAR';
export const ALERT_NURSE_WITH_STATUS = 'T2.ALERT_NURSE_WITH_STATUS';
export const ALERT_NURSE_DIALOGUE_OPEN = 'T2.ALERT_NURSE_DIALOGUE_OPEN';

export const RECIEVE_MESSAGE_FROM_NURSE = 'T2.RECIEVE_MESSAGE_FROM_NURSE';
export const RECIEVE_NURSE_ACKNOWLEDGE = 'T2.RECIEVE_NURSE_ACKNOWLEDGE'; //nurse acknowleged
export const SYSTEM_MESSAGE = 'T2.SYSTEM_MESSAGE';
export const USER_PROMPT_FOR_NURSE_HIGH_PAIN = 'T2.USER_PROMPT_FOR_NURSE_HIGH_PAIN';
export const USER_NURSE_PROMPT_RESET = 'T2.USER_NURSE_PROMPT_RESET';
export const SET_USER_HIGH_PAIN_TRUE = 'T2.SET_USER_HIGH_PAIN_TRUE';
export const SET_USER_HIGH_PAIN_FALSE = 'T2.SET_USER_HIGH_PAIN_FALSE';

import {nextId} from './_helper';
const messsageIntollerablePain = [
        "You've indicated you are experiencing intollerable pain.", 
        "Would you like to speak to a nurse?"
    ];
const tmpSimulatedContact = () => {
  return new Promise<any>((res,rej) => {
      setTimeout(() => {
        res(recieveNurseMessage("On my way"));
      },4000)
  });

}



const getLastAssessment = (state) => {
  if(state.assessmentIds.length){
    return state.assessmentIds
              .map(aid => state.assessments[aid])
              .filter(assess => Object.keys(assess.bodySections).length > 0)
              .pop();
  }
  return null;
}

const isPainInTolerable = (assessment: {bodySections: {[propName: string]: number}, painLevels:{[propName: string]: number}}, overallPainLevel:PainLevelInterface, painLevels:PainLevelsObject) => {
  const tooPainfulSections = Object.keys(assessment.bodySections).filter(propName => {
      const painLevelId = assessment.bodySections[propName];
      const bodySectionPainLevel = typeof painLevels[painLevelId] !== 'undefined' ? painLevels[painLevelId] : null;
      const currentPainLevelId = typeof assessment.painLevels['1'] !== 'undefined' ? assessment.painLevels['1'] : null ;
      const currentPain = currentPainLevelId ? painLevels[currentPainLevelId] : null;

      if(currentPain && currentPain.level > overallPainLevel.level){
        return true; //user has indicated Current Overrall Pain Levels Greater than Tolerable Pain Levels 
      }
      if(bodySectionPainLevel && bodySectionPainLevel.level >= overallPainLevel.level){
        return true; //user has indicated unbearable pain on the bodySection map
      }
      return false;
  });
  return tooPainfulSections.length > 0;
}

export const clearNurseAlert = () => {
  return {
    type: ALERT_NURSE_CLEAR
  }
}
export const promptUserHighPain = () => {
  return {
    type: USER_PROMPT_FOR_NURSE_HIGH_PAIN
  }
}

export const resetNursePrompt = () => {
  return {
    type: USER_NURSE_PROMPT_RESET
  }
}

export const alertNurseWithStatus = (status: number) => {
  return {
    type: ALERT_NURSE_WITH_STATUS,
    status
  }
}

export const alertNurseHighPain = () => {
  return alertNurseWithStatus(5);
}

export const alertNurseNewPain = () => {
  return alertNurseWithStatus(6);
}

export const userHasHighPain = () => {
  return {
    type: SET_USER_HIGH_PAIN_TRUE,
  }
}

export const userDoesNotHaveHighPain = () => {
  return {
    type: SET_USER_HIGH_PAIN_FALSE,
  }
}

export const checkForUserHighPain = (painLevel: PainLevelInterface, assessment: AssessmentInterface) => {
  return (dispatch,getState) => {
    const currentState = getState();
  
      if(isPainInTolerable(assessment,painLevel,currentState.painLevels)){
        if(!currentState.nurseSystem.userPromptedForPain){
          dispatch(clearNurseAlert());
          dispatch(messagePromptUser(assessment.id + '_high_pain','nurse_prompt',1,messsageIntollerablePain));
        }
        dispatch(userHasHighPain());
      }else{
        dispatch(userDoesNotHaveHighPain());
      }
  }
}

export const alertNurseDialogueOpen = () => {
  const prompt = messagePromptUser('global_nurse_allert','nurse_prompt',0,'Are you sure you would like to contact the nurse?');
  return (dispatch,getState) => {
    dispatch(clearNurseAlert());
    dispatch(prompt);
  }
}

export const systemMessage = (messageString: string) => {
  
  return (dispatch,getState) => {
    const newMessage = createMessage(SYSTEM_MESSAGE,nextId(getState().nurseSystem.messageIds),messageString);
    dispatch(newMessage);
  }
}
export const alertNurseEnd = () => {
  return {
    type: ALERT_NURSE_END
  }
}

export const alertNurseStart = () => {
  return {
    type: ALERT_NURSE_START
  }
}

export const alertNurseTimeout = () => {
  return {
    type: ALERT_NURSE_TIMEOUT
  }
}


export const alertNurse = () => {
  return function(dispatch,getState,xtraTest){
    console.log(xtraTest);
    dispatch(alertNurseStart())
    return tmpSimulatedContact().then((action) => {
        dispatch(action)
        dispatch(alertNurseEnd())
        return true;
    }).catch((e) => {
        dispatch(systemMessage('Could not contact nurse. Please try again.'));
        dispatch(alertNurseTimeout());
    })
  }
}

export const alertNurseBackground = () => {
  return function(dispatch,getState,xtraTest){
    dispatch(alertNurseStart())
    return tmpSimulatedContact().then((action) => {
        dispatch(action)
        dispatch(alertNurseEnd())
        return true;
    }).catch((e) => {

    })
  }
}

const createMessage = (type: string, id: number,  messageString: string) => {
  let ts = new Date();
  let tsMs = ts.getTime();
  return {
    type,
    message: {id, message: messageString},
    timestamep: tsMs
  }
}

export const recieveNurseMessage = (messageString: string) => {
  return (dispatch,getState) => {
    const newMessage = createMessage(RECIEVE_MESSAGE_FROM_NURSE,nextId(getState().nurseSystem.messageIds),messageString);
    dispatch(newMessage);
  }
}