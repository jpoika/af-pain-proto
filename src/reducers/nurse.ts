import {ALERT_NURSE,RECIEVE_NURSE_ACKNOWLEDGE,RECIEVE_MESSAGE_FROM_NURSE} from '../actions/nurse';
const defaultSystem = {
  status: 0 // 0: no active alert, 1: waiting for response, 2: nurse acknowledge, 3: alert timeout
}

export const nurseSystem = (state,action) => {
  switch (action.type) {
    case ALERT_NURSE:
      state = {...state, status: 1}
      break;
    case RECIEVE_NURSE_ACKNOWLEDGE:
      state = {...state, status: 2}
      break;
  }
  return state;
}

export const messages = (state,action) => {

}

export const messagesId = (state,action) => {

}