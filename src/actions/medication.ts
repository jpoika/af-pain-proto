import {MedicationInterface} from '../res/data/medication'
export const MEDICATION_REMOVE = 'T2.MEDICATION_REMOVE';
export const MEDICATION_EDIT = 'T2.MEDICATION_EDIT';

import {nextId} from './_helper';


export const medicationEdit = (medication: MedicationInterface) => {

  return (dispatch,getState) => {
    if(medication.id === 0){
      medication.id = nextId(getState().medicationIds);
    }
    dispatch({
      type: MEDICATION_EDIT,
      medication
    });
  }
}


export const medicationRemove = (id: number) => {
  return {
    type: MEDICATION_REMOVE,
    id
  }
}