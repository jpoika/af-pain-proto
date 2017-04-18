import {MEDICATION_ADD, MEDICATION_REMOVE, MEDICATION_EDIT} from '../actions/medication'
import {arrayPushUnique, arrayRemove} from './helpers';
export const medications = (state={},action) => {
  switch (action.type) {
    case MEDICATION_ADD:
    case MEDICATION_EDIT:
      state = {...state,[action.medication.id]: {...action.medication}}
      break;
    case MEDICATION_REMOVE:
      console.log(MEDICATION_REMOVE);
      delete state[action.id];
      state = {...state};
      break;
  }
  return state;  
}

export const medicationIds = (state=[],action) => {
  switch (action.type) {
    case MEDICATION_ADD:
      state = arrayPushUnique(action.medication.id,state);
      break;
    
    case MEDICATION_REMOVE:
      console.log(MEDICATION_REMOVE);
      state = arrayRemove(action.id,state);
      break;
  }
  return state;
}