import {MedicationInterface} from '../res/data/medication'
export const MEDICATION_REMOVE = 'T2.MEDICATION_REMOVE';
export const MEDICATION_EDIT = 'T2.MEDICATION_EDIT';
export const MEDICATION_CHOICE_EDIT = 'T2.MEDICATION_CHOICE_EDIT';
export const MEDICATION_CHOICE_REMOVE = 'T2.MEDICATION_CHOICE_REMOVE';

import {nextId} from './_helper';


export const medicationEdit = (medication: MedicationInterface,newProps: {[propName: string]: any} = {}) => {

  return (dispatch,getState) => {
    const curr_state = getState();
    if(medication.id === 0){
      medication.id = nextId(curr_state.medicationIds);
    }
    const medChoices = curr_state.medicationchoices;
    Object.assign(medication, newProps);

    if(medication.medicationId && typeof medChoices[medication.medicationId] !== 'undefined'){
      medication.name = medChoices[medication.medicationId].name;
    }

    dispatch({
      type: MEDICATION_EDIT,
      medication
    });
  }
}

export const medicationChoiceEdit = (medicationChoice: MedicationInterface,newProps: {[propName: string]: any} = {}) => {

  return (dispatch,getState) => {
    const curr_state = getState();
    if(medicationChoice.id === 0){
      medicationChoice.id = nextId(curr_state.medicationchoiceIds);
    }
    Object.assign(medicationChoice,newProps);
    
    return dispatch(
            {
              type: MEDICATION_CHOICE_EDIT,
              medicationChoice: medicationChoice
             }
          );
  }
}


export const medicationRemove = (id: number) => {
  return {
    type: MEDICATION_REMOVE,
    id
  }
}