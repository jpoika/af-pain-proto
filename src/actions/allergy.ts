import {AllergyInterface,makeAllergy} from '../res/data/allergy';
export const ALLERGY_ADD = 'T2.ALLERGY_ADD';
export const ALLERGY_REMOVE = 'T2.ALLERGY_REMOVE';
export const ALLERGY_EDIT = 'T2.ALLERGY_EDIT';
import {nextId} from './_helper';



export const allergyAdd = (allergy: AllergyInterface) => {
  return {
    type: ALLERGY_ADD,
    allergy
  }
}

export const allergyEdit = (allergy: AllergyInterface) => {
  return {
    type: ALLERGY_EDIT,
    allergy
  }
}

export const allergyAddBlank = () => {
  return (dispatch,getState) => {
      dispatch(allergyAdd(makeAllergy(nextId(getState().allergyIds),'')));
  }
}

export const allergyRemove = (id: number) => {
  return {
    type: ALLERGY_REMOVE,
    id
  }
}