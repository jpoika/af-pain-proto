import {ALLERGY_ADD, ALLERGY_REMOVE, ALLERGY_EDIT} from '../actions/allergy'
import {arrayPushUnique, arrayRemove} from './_helpers';
export const allergies = (state={},action) => {
  switch (action.type) {
    case ALLERGY_ADD:
    case ALLERGY_EDIT:
      state = {...state,[action.allergy.id]: {...action.allergy}}
      break;
    case ALLERGY_REMOVE:
      delete state[action.id];
      state = {...state};
      break;
  }
  return state;  
}

export const allergyIds = (state=[],action) => {
  switch (action.type) {
    case ALLERGY_ADD:
      state = arrayPushUnique(action.allergy.id,state);
      break;
    
    case ALLERGY_REMOVE:
      state = arrayRemove(action.id,state);
      break;
  }
  return state;
}