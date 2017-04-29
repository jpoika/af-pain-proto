import {PainLevelInterface, PainLevelsObject} from '../res/data/pain';

export const ALERT_NURSE = 'T2.ALERT_NURSE';
export const ALERT_NURSE_START = 'T2.ALERT_NURSE_START';
export const ALERT_NURSE_END = 'T2.ALERT_NURSE_END';
export const ALERT_NURSE_TIMEOUT= 'T2.ALERT_NURSE_TIMEOUT';
export const ALERT_NURSE_CLEAR = 'T2.ALERT_NURSE_CLEAR';
export const ALERT_NURSE_WITH_STATUS = 'T2.ALERT_NURSE_WITH_STATUS';
export const ALERT_NURSE_DIALOGUE_OPEN = 'T2.ALERT_NURSE_DIALOGUE_OPEN';
export const ALERT_NURSE_DIALOGUE_CLOSE = 'T2.ALERT_NURSE_DIALOGUE_CLOSE';

export const RECIEVE_MESSAGE_FROM_NURSE = 'T2.RECIEVE_MESSAGE_FROM_NURSE';
export const RECIEVE_NURSE_ACKNOWLEDGE = 'T2.RECIEVE_NURSE_ACKNOWLEDGE'; //nurse acknowleged
export const SYSTEM_MESSAGE = 'T2.SYSTEM_MESSAGE';
export const USER_PROMPT_FOR_NURSE_HIGH_PAIN = 'T2.USER_PROMPT_FOR_NURSE_HIGH_PAIN';
export const SET_USER_HIGH_PAIN_TRUE = 'T2.SET_USER_HIGH_PAIN_TRUE';
export const SET_USER_HIGH_PAIN_FALSE = 'T2.SET_USER_HIGH_PAIN_FALSE';

import {nextId} from './_helper';

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

const isPainInTolerable = (assessment: {bodySections: {[propName: string]: number}}, overallPainLevel:PainLevelInterface, painLevels:PainLevelsObject) => {
  const tooPainfulSections = Object.keys(assessment.bodySections).filter(propName => {
      let painLevelId = assessment.bodySections[propName];
      let bodySectionPainLevel = typeof painLevels[painLevelId] !== 'undefined' ? painLevels[painLevelId] : null;
     
      if(bodySectionPainLevel && bodySectionPainLevel.level >= overallPainLevel.level){
        return true; //user has indicated unbearable pain on the bodySection map
      }
      return false;
  });
  return tooPainfulSections.length > 0;
}


export const promptUserHighPain = () => {
  return {
    type: USER_PROMPT_FOR_NURSE_HIGH_PAIN
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

export const checkForUserHighPain = (painLevel: PainLevelInterface, assessmentId: number) => {
  return (dispatch,getState) => {
    const currentState = getState();
    const lastAssessment = getLastAssessment(currentState);
 
    if(lastAssessment){
      console.log(lastAssessment);
      if(isPainInTolerable(lastAssessment,painLevel,currentState.painLevels)){
        if(!currentState.nurseSystem.userPromptedForPain){
          dispatch(alertNurseHighPain());
          dispatch(promptUserHighPain());
        }
        dispatch(userHasHighPain());
      }else{
        dispatch(userDoesNotHaveHighPain());
      }
    } else {
      console.log('no last assessment');
    }
  }
}

export const alertNurseDialogueOpen = () => {
  return {
    type: ALERT_NURSE_DIALOGUE_OPEN
  }
}

export const alertNurseDialogueClose = () => {
  return {
    type: ALERT_NURSE_DIALOGUE_CLOSE
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
  return function(dispatch,getState){
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