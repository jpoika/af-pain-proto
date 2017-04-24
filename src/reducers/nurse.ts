import {
  ALERT_NURSE,
  ALERT_NURSE_START,
  RECIEVE_NURSE_ACKNOWLEDGE,
  RECIEVE_MESSAGE_FROM_NURSE,
  ALERT_NURSE_TIMEOUT,
  ALERT_NURSE_CLEAR,
  ALERT_NURSE_DIALOGUE_OPEN,
  ALERT_NURSE_DIALOGUE_CLOSE
} from '../actions/nurse';

const defaultSystem = {
  status: 0, // 0: no active alert, 1: waiting for response, 2: nurse acknowledge, 3: alert timeout, 4: user_confirm
  dialogStatus: 0, // 0: closed 1: Open
  messages: {},
  messageIds: []
}

export const nurseSystem = (state = defaultSystem,action) => {

  switch (action.type) {
    case ALERT_NURSE_DIALOGUE_OPEN:
      state = {...state,dialogStatus: 1,status: 4};
      state = {...state}
      break;
    case ALERT_NURSE_DIALOGUE_CLOSE:
      state = {...state,dialogStatus: 0};
      state = {...state}
      break;
    case ALERT_NURSE:
      state = {...state, status: 1, dialogStatus: 1};
      state = {...state}
      break;
    case ALERT_NURSE_START:
      state = {...state, status: 1, dialogStatus: 1};
      state = {...state}
      break;
    case RECIEVE_NURSE_ACKNOWLEDGE:
    case RECIEVE_MESSAGE_FROM_NURSE:
      state = {...state, 
                    status: 2,
                    messages: messages(state.messages,action),
                    messageIds: messageIds(state.messageIds,action)
                  };
      state = {...state}
      break;
    case ALERT_NURSE_TIMEOUT:
      state = {...state, status: 3};
      state = {...state}
    case ALERT_NURSE_CLEAR:
      state = {...state, status: 0};
      state = {...state}
      break;
  }
  return state;
}

import {arrayPushUnique, arrayRemove} from './helpers';
export const messages = (state={},action) => {
  switch (action.type) {
    case RECIEVE_MESSAGE_FROM_NURSE:
      state = {...state,[action.message.id]: {...action.message}}
      break;
  }
  return state;  
}

export const messageIds = (state=[],action) => {
  switch (action.type) {
    case RECIEVE_MESSAGE_FROM_NURSE:
      state = arrayPushUnique(action.message.id,state);
      break;
  }
  return state;
}

