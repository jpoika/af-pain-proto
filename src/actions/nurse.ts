export const ALERT_NURSE = 'T2.ALERT_NURSE';
export const ALERT_NURSE_START = 'T2.ALERT_NURSE_START';
export const ALERT_NURSE_END = 'T2.ALERT_NURSE_END';
export const ALERT_NURSE_TIMEOUT= 'T2.ALERT_NURSE_TIMEOUT';
export const ALERT_NURSE_CLEAR = 'T2.ALERT_NURSE_CLEAR';
export const ALERT_NURSE_DIALOGUE_OPEN = 'T2.ALERT_NURSE_DIALOGUE_OPEN';
export const ALERT_NURSE_DIALOGUE_CLOSE = 'T2.ALERT_NURSE_DIALOGUE_CLOSE';

export const RECIEVE_MESSAGE_FROM_NURSE = 'T2.RECIEVE_MESSAGE_FROM_NURSE';
export const RECIEVE_NURSE_ACKNOWLEDGE = 'T2.RECIEVE_NURSE_ACKNOWLEDGE'; //nurse acknowleged
export const SYSTEM_MESSAGE = 'T2.SYSTEM_MESSAGE';
const tmpSimulatedContact = () => {
  return new Promise<any>((res,rej) => {
      setTimeout(() => {
        res(recieveNurseMessage("On my way"));
      },10000)
  });

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

export const systemMessage = (message) => {
  return {
    type: SYSTEM_MESSAGE,
    message
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

export const recieveNurseMessage = (message: string) => {
  return {
    type: RECIEVE_MESSAGE_FROM_NURSE,
    message
  }
}