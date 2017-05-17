export interface AssessmentPainCategoriesInterface {
  id: number;
  title: string;
  description: string;
}

export const makePainCategory = (id: number, title: string, description: string = ''):AssessmentPainCategoriesInterface => {
  return {
    id,
    title,
    description
  }
}


export interface AssessmentInterface {
  id: number;
  bodySections: any;
  painLevels: any;
  step: number;
  isComplete: boolean;
  completedOn: number;
  title: string;
  type: string;
  status: number; //0: incomplete, 1: complete and filled, 2: complete/no-change, 3: complete/skipped
}

export const statusHash = {
  '0': 'Started',
  '1': 'Completed',
  '2': 'No Change from Last Assessment',
  '3': 'Skipped'
}

export const typeHash = {
  'initial': 'Initial Assessment',
  'newpain': 'New Pain',
  'reassessment': 'Re-Assessment'
}

export const makeAssessment = (id:number, title:string, type: string, status: number = 0, bodySections:any = {},painLevels:any = {}):AssessmentInterface  => {
  return {
    id,
    bodySections,
    painLevels,
    step: 0,
    isComplete: false,
    type,
    title,
    status,
    completedOn: null
  }
}


export const assessmentPainCategories = [
  makePainCategory(1,'Current Pain'),
  makePainCategory(1,'Acceptable Pain'),
  makePainCategory(1,'Tolerable Pain')
];









