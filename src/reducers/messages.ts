import {
  MESSAGE_CREATE,
  MESSAGE_DELETE,
  MESSAGE_PROMPT_USER,
  MESSAGE_PROMPT_CLEAR,
  MESSAGE_UPDATE_PROMPT
} from '../actions/messages'
import {arrayPushUnique,arrayRemove} from './_helpers';


export const messageIds = (state=[],action) => {
  switch (action.type) {
    case MESSAGE_CREATE:
      state = arrayPushUnique(action.message.id, state);
      break;
    case MESSAGE_DELETE:
      state = arrayRemove(action.message.id, state);
      break;
  }
  return state;
}


export const messages = (state={},action) => {
  switch (action.type) {
    case MESSAGE_CREATE:
      state = {...state,[action.message.id]: action.message}
      break;
    case MESSAGE_DELETE:
      delete state[action.message.id];
      state = {...state}
      break;
  }
  return state;
}


export const messagePromptIds = (state=[],action) => {
  switch (action.type) {
    case MESSAGE_UPDATE_PROMPT:
      state = arrayPushUnique(action.prompt.id, state);
      break;
  }
  return state;
}

const getSavedPromptCount = (state,prompt) => {
  return typeof state[prompt.id] !== 'undefined' ? state[prompt.id].count : 0;
}

export const messagePrompts = (state={},action) => {
  switch (action.type) {
    case MESSAGE_UPDATE_PROMPT: //do not advance count
      var prompt = {...action.prompt, count: getSavedPromptCount(state,action.prompt)};
      state = {...state,[action.prompt.id]: prompt};
      break;
    case MESSAGE_PROMPT_USER: //add 1 to count
      var prompt = {...action.prompt, count: getSavedPromptCount(state,action.prompt) +  1};
      state = {...state,[action.prompt.id]: prompt};
      break;
  }
  return state;
}

export const messageDialogs = (state={}, action) => {
  switch (action.type) {
    case MESSAGE_PROMPT_USER:
      state = {...state,[action.prompt.name]: {open: true, messageId: action.prompt.messageId}}; //open prompt
      break;
    case MESSAGE_PROMPT_CLEAR:
      state = {...state,[action.promptName]: {open: false, messageId: null}}; //close prompt
      break;
  }
  return state;
}

export const messageDialogIds = (state=[],action) => {
  switch (action.type) {
    case MESSAGE_PROMPT_USER:
      state = arrayPushUnique(action.prompt.name,state);
      break;
    case MESSAGE_PROMPT_CLEAR:
      state = arrayRemove(action.promptName,state);
      break;
  }
  return state;
}


