import {
  ALERT_NURSE,
  RECIEVE_NURSE_ACKNOWLEDGE,
  RECIEVE_MESSAGE_FROM_NURSE,
  ALERT_NURSE_TIMEOUT,
  ALERT_NURSE_CLEAR
} from '../actions/nurse';

const defaultSystem = {
  status: 0 // 0: no active alert, 1: waiting for response, 2: nurse acknowledge, 3: alert timeout
}

export const nurseSystem = (state,action) => {
  switch (action.type) {
    case ALERT_NURSE:
      state = {...state, status: 1};
      break;
    case RECIEVE_NURSE_ACKNOWLEDGE:
    case RECIEVE_MESSAGE_FROM_NURSE:
      state = {...state, status: 2};
      break;
    case ALERT_NURSE_TIMEOUT:
      state = {...state, status: 3};
    case ALERT_NURSE_CLEAR:
      state = {...state, status: 0};
      break;
  }
  return state;
}

export const messages = (state,action) => {

}

export const messagesId = (state,action) => {

}

