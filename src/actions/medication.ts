import {MedicationInterface,makeMedication} from '../res/data/medication'
export const MEDICATION_ADD = 'T2.MEDICATION_ADD';
export const MEDICATION_REMOVE = 'T2.MEDICATION_REMOVE';
export const MEDICATION_EDIT = 'T2.MEDICATION_EDIT';


export const getMax = function(array){
  return Math.max.apply(null,array);
}

export const nextId = (array) => {
  let nextId = array.length ? getMax(array) + 1 : 1;
  return nextId;
}

export const medicationAdd = (medication: MedicationInterface) => {
  return {
    type: MEDICATION_ADD,
    medication
  }
}

export const medicationEdit = (medication: MedicationInterface) => {
  return {
    type: MEDICATION_EDIT,
    medication
  }
}

export const medicationAddBlank = () => {
  return (dispatch,getState) => {
      dispatch(medicationAdd(makeMedication(nextId(getState().medicationIds),'')));
  }
}

export const medicationRemove = (id: number) => {
  return {
    type: MEDICATION_REMOVE,
    id
  }
}