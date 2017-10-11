import {
  MESSAGE_CREATE,
  MESSAGE_DELETE,
  MESSAGE_PROMPT_USER,
  //MESSAGE_PROMPT_CLEAR,
  MESSAGE_UPDATE_PROMPT,
  MESSAGE_PROMPT_EDIT
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

const getSavedPromptCount = (state,promptId) => {
  return typeof state[promptId] !== 'undefined' ? state[promptId].count : 0;
}

export const messagePrompts = (state={},action) => {
  switch (action.type) {
    case MESSAGE_UPDATE_PROMPT: //do not advance count
      var prompt = {...action.prompt, count: getSavedPromptCount(state,action.prompt.id)};
      state = {...state,[action.prompt.id]: prompt};
      break;
    case MESSAGE_PROMPT_USER: //add 1 to count
      var prompt = {...action.prompt, count: getSavedPromptCount(state,action.prompt.id) +  1};
      state = {...state,[action.prompt.id]: prompt};
      break;
    case MESSAGE_PROMPT_EDIT:
      state = {...state, [action.prompt.id]: action.prompt};
      break;
  }
  return state;
}



