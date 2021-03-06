import {
  MEDICATION_REMOVE, 
  MEDICATION_EDIT,
  MEDICATION_CHOICE_EDIT
} from '../actions/medication';
import {medicationchoices as medChoiceDefaults, medicationchoiceIds as medicationchoiceIdsDefault} from '../res/data/medication';
import {arrayPushUnique, arrayRemove} from './_helpers';

export const medicationchoices = (state=medChoiceDefaults,action) => {
  switch(action.type){
    case MEDICATION_CHOICE_EDIT:
      state = {...state,[action.medicationChoice.id]: {...action.medicationChoice}}
      break;
  }
  return state;
}

export const medicationchoiceIds = (state = medicationchoiceIdsDefault,action) => {
  switch(action.type){
    case MEDICATION_CHOICE_EDIT:
      state = arrayPushUnique(action.medicationChoice.id,state);
      break;
  }
  return state; 
}

export const medications = (state={},action) => {
  switch (action.type) {
    case MEDICATION_EDIT:
      state = {...state,[action.medication.id]: {...action.medication}}
      break;
    case MEDICATION_REMOVE:
      delete state[action.id];
      state = {...state};
      break;
  }
  return state;  
}

export const medicationIds = (state=[],action) => {
  switch (action.type) {
    case MEDICATION_EDIT:
      state = arrayPushUnique(action.medication.id,state);
      break;
    
    case MEDICATION_REMOVE:
      state = arrayRemove(action.id,state);
      break;
  }
  return state;
}