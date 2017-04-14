export enum GenderEnum {
  Male,
  Female
}

export const GenderList = [
  {id: GenderEnum.Male, name: GenderEnum[GenderEnum.Male]},
  {id: GenderEnum.Female, name: GenderEnum[GenderEnum.Female]}
]

export interface AccountInterface {
  firstname: string;
  middlename: string;
  lastname: string;
  gender: GenderEnum,
  dob: number
}
