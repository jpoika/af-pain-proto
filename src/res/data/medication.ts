export interface MedicationInterface {
  id: number;
  name: string;
  amount: number;
  amountUnitId: number;
  routeId: number;
  frequency: number;
  frequencyUnit: string;
}

export interface MedicationRouteInterface {
  id: number;
  name: string;
}

export interface AmountUnitInterface {
  id: number;
  name: string;
  description: string;
}

export const amountUnits:AmountUnitInterface[] = [
  {id: 1, name: 'mg', description: 'milligram(s)'},
  {id: 2, name: 'mL', description: 'milliliter(s)'},
  {id: 10, name: 'Other', description: ''}
];

export const routes:MedicationRouteInterface[] = [
  {id: 1, name: "RA"},
  {id: 2, name: "Oral"},
  {id: 3, name: "IV/IM"},
  {id: 4, name: "Topical"},
  {id: 5, name: "PCA"},
  {id: 6, name: "Other"} 
]

export const frequencyUnits = [
 'day',
 'hour',
 'month'
]

export const makeMedication = (
                  id: number,
                  name: string, 
                  amount: number = null,
                  amountUnitId: number = null, 
                  routeId: number = null,
                  frequency: number = null,
                  frequencyUnit: string = ''
            ):MedicationInterface => {
            return {
              id,
              name,
              amount,
              amountUnitId:  null,
              routeId: null,
              frequency,
              frequencyUnit
            }
}



