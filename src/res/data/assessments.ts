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


export const assessmentPainCategories = [
  makePainCategory(1,'Current Pain'),
  makePainCategory(1,'Acceptable Pain'),
  makePainCategory(1,'Tolerable Pain')
]