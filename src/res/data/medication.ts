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
  description: string;
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
  {id: 1, name: "RA", description: ''},
  {id: 2, name: "Oral", description: ''},
  {id: 3, name: "IV/IM", description: ''},
  {id: 4, name: "Topical", description: ''},
  {id: 5, name: "PCA", description: ''},
  {id: 6, name: "Other", description: ''} 
]

export const frequencyUnits = [
 'day',
 'hour',
 'month'
]

export const makeMedication = (
                  id: number,
                  name: string, 
                  amount: number = 0,
                  amountUnitId: number = 0, 
                  routeId: number = 0,
                  frequency: number = 0,
                  frequencyUnit: string = ''
            ):MedicationInterface => {
            return {
              id,
              name,
              amount,
              amountUnitId,
              routeId,
              frequency,
              frequencyUnit
            }
}



