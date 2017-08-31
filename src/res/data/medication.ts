import { normalize, schema } from 'normalizr';

const medSchema = new schema.Entity('medication');
const medSchemaList = new schema.Array(medSchema);

export interface MedicationInterface {
  id: number;
  name: string;
  amount: number;
  amountUnitId: number;
  medicationId: number;
  routeId: number;
  frequency: number;
  frequencyUnit: string;
}

export interface MedicationListInterface{
  [propName: string]: MedicationInterface;
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
  {id: 1, name: "By mouth", description: ''},
  {id: 2, name: "Shot in my muscle", description: ''},
  {id: 3, name: "Shot in my IV", description: ''},
  {id: 4, name: "Regional Anesthesia", description: ''},
  {id: 5, name: "Epidural", description: ''},
  {id: 6, name: "PCA Pump", description: ''},
  {id: 7, name: "Peripheral Nerve Block", description: ''},
  {id: 8, name: "Topical: applied to my skin", description: ''},
  {id: 9, name: "Other", description: ''} 
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
                  routeId: number = null,
                  frequency: number = 0,
                  frequencyUnit: string = '',
                  medicationId: number = null
            ):MedicationInterface => {
            return {
              id,
              name,
              amount,
              amountUnitId,
              routeId,
              frequency,
              frequencyUnit,
              medicationId
            }
}

export const medicationChoicesRaw: MedicationInterface[] = [
  makeMedication(1,"Percocet (Oxycodone/Acetaminophen)"),
  makeMedication(2,"Morphine"),
  makeMedication(3,"Dilauid (Hydromorphone)"),
  makeMedication(4,"Vicodin (Hydrocodone/Acetaminophen)"),
  makeMedication(5,"Tylenol (Acetaminophen)"),
  makeMedication(6,"Motrin (Ibuprofen)"),
  makeMedication(7,"Toradol (Ketorolac)"),
  makeMedication(8,"Demerol (Meperidine)"),
  makeMedication(9,"Ultram (Tramadol)"),
  makeMedication(10,"Neurontin (Gabapentin)"),
  makeMedication(11,"Oxycotin (Oxycodone)"),
  makeMedication(12,"Aleve (Naproxen)")
]


const normalData = normalize(medicationChoicesRaw,medSchemaList);

export const medicationchoices: MedicationListInterface= normalData.entities.medication;

export const medicationchoiceIds = normalData.result;


