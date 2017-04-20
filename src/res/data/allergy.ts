export interface AllergyInterface {
  id: number,
  name: string,
  description: string
}


export const makeAllergy = (id: number, name: string, description:string = ''):AllergyInterface => {
  return {
    id,
    name,
    description
  }
}