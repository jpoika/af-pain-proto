import {
  ALERT_NURSE,
  ALERT_NURSE_START,
  RECIEVE_NURSE_ACKNOWLEDGE,
  RECIEVE_MESSAGE_FROM_NURSE,
  ALERT_NURSE_TIMEOUT,
  ALERT_NURSE_CLEAR,
  ALERT_NURSE_DIALOGUE_OPEN,
  ALERT_NURSE_DIALOGUE_CLOSE,
  SET_USER_HIGH_PAIN_FALSE,
  SET_USER_HIGH_PAIN_TRUE,
  USER_PROMPT_FOR_NURSE_HIGH_PAIN,
  ALERT_NURSE_WITH_STATUS
} from '../actions/nurse';
import {REHYDRATE} from 'redux-persist/constants';

const defaultSystem = {
  status: 0, // 0: no active alert, 1: waiting for response, 2: nurse acknowledge, 3: alert timeout, 4: user_confirm
  dialogStatus: 0, // 0: closed 1: Open
  messages: {},
  messageIds: [],
  userPromptedForPain: 0, // 0: no active pain alert , 1: user has been prompted
  userHasHighPain: 0
}

export const nurseSystem = (state = defaultSystem,action) => {

  switch (action.type) {
    case ALERT_NURSE_DIALOGUE_OPEN:
      state = {...state,dialogStatus: 1,status: 4};
      break;
    case ALERT_NURSE_DIALOGUE_CLOSE:
      state = {...state,dialogStatus: 0};
      break;
    case ALERT_NURSE:
      state = {...state, status: 1, dialogStatus: 1};
      break;
    case ALERT_NURSE_START:
      state = {...state, status: 1, dialogStatus: 1};
      break;
    case RECIEVE_NURSE_ACKNOWLEDGE:
    case RECIEVE_MESSAGE_FROM_NURSE:
      state = {...state, 
                    status: 2,
                    messages: messages(state.messages,action),
                    messageIds: messageIds(state.messageIds,action)
                  };
      break;
    case ALERT_NURSE_TIMEOUT:
      state = {...state, status: 3};
      break;
    case ALERT_NURSE_CLEAR:
      state = {...state, status: 0};
      break;
    case SET_USER_HIGH_PAIN_FALSE:
      state = {...state, userHasHighPain: 0,userPromptedForPain: 0};
      break;
    case SET_USER_HIGH_PAIN_TRUE:
      state = {...state, userHasHighPain: 1};
      break;
    case USER_PROMPT_FOR_NURSE_HIGH_PAIN:
      state = {...state, userPromptedForPain: 1, dialogStatus: 1};
      break;
    case ALERT_NURSE_WITH_STATUS:
      state = {...state,status: action.status}
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

