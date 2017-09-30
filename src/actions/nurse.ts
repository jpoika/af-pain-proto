import {messagePromptUser, closePrompt} from './messages'
import {sendMessage} from './';
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

let nurseAlertPromptTimeout;

const tmpSimulatedContact = () => {
  return new Promise<any>((res,rej) => {
      setTimeout(() => {
        res(recieveNurseMessage("On my way"));
      },1000)
  });

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

export const alertNurseMedQuestion = () => {


  return (dispatch, getState) => {
    dispatch(sendMessage('Contacting Nurse'));
    dispatch(alertNurseWithStatus(7));
  }
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

export const alertNurseDialogueOpen = () => {
  nurseAlertPromptTimeout && clearTimeout(nurseAlertPromptTimeout);
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
    dispatch(alertNurseStart())
    return tmpSimulatedContact().then((action) => {
        dispatch(action)
        dispatch(alertNurseEnd())
        nurseAlertPromptTimeout && clearTimeout(nurseAlertPromptTimeout);
        nurseAlertPromptTimeout = setTimeout(() => {
          dispatch(closePrompt('nurse_prompt'));
        },3000);
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