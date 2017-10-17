import { normalize, schema } from 'normalizr';

const medSchema = new schema.Entity('medication');
const medSchemaList = new schema.Array(medSchema);

export interface MedicationInterface {
  id: number;
  name: string;
  amount: number;
  info: string[]
  amountUnitId: number;
  medicationId: number;
  routeId: number;
  frequency: number;
  frequencyUnit: string;
  userDefined: boolean;
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
                  info: string[] = [],
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
              info,
              userDefined: false,
              amount,
              amountUnitId,
              routeId,
              frequency,
              frequencyUnit,
              medicationId
            }
}

export const makeUserDefinedMedication = (
                  id: number,
                  name: string, 
                  info: string[] = [],
                  amount: number = 0,
                  amountUnitId: number = 0, 
                  routeId: number = null,
                  frequency: number = 0,
                  frequencyUnit: string = '',
                  medicationId: number = null
            ): MedicationInterface => {

            const defaultMed = makeMedication(
                  id,
                  name
              );
            return {...defaultMed,userDefined: true}
}

const info_fillter1 = [
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel neque semper, sagittis tortor eu, eleifend neque. Duis mattis congue mauris, a venenatis diam rhoncus et. Sed a tristique augue. Vivamus aliquet nisl eu hendrerit congue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec finibus sem in purus posuere luctus. Aliquam in diam ex. Pellentesque bibendum odio orci, vitae venenatis dolor convallis sed. Quisque mattis nulla non libero rutrum, nec ultrices erat faucibus. Vestibulum sagittis pulvinar pellentesque. Nullam eget odio sed nunc cursus venenatis. Suspendisse sodales sagittis maximus. Proin vulputate ipsum quis lacus posuere, vitae ultricies elit tempus.",
"Pellentesque turpis purus, vulputate ut accumsan quis, consequat in purus. Nunc interdum id metus a hendrerit. Fusce elementum ligula nisl, ac volutpat diam elementum vel. Integer aliquet commodo sapien, fermentum posuere tellus viverra non. Mauris id varius eros. Curabitur faucibus sem ut sapien congue imperdiet. Proin eget finibus nisl. Sed quis fringilla risus, a ultrices erat. Duis ut commodo lectus, nec mollis nunc. Suspendisse ultricies erat a ante dictum, a varius quam mattis. Maecenas commodo at magna eu malesuada. Donec mattis porttitor cursus. In condimentum, ipsum id fringilla consequat, nisi velit auctor arcu, ac porttitor odio felis quis lorem. Donec elementum justo ut turpis tincidunt, vitae iaculis ante interdum."
]

const info_fillter2 = [
"Vivamus tincidunt, nunc in egestas tincidunt, dolor est rhoncus sem, nec laoreet nibh dui in velit. Etiam hendrerit risus eget dui tincidunt dignissim. Maecenas ex mauris, sagittis nec egestas in, sagittis vel quam. Aenean et augue eu quam interdum pellentesque. Sed vulputate, risus ut ultricies molestie, erat velit accumsan ipsum, hendrerit accumsan dui erat ac eros. Vestibulum mollis dapibus dictum. Pellentesque feugiat enim eu velit sodales pellentesque. Fusce suscipit metus vitae nulla hendrerit pellentesque. Cras iaculis eros rutrum, interdum eros ut, commodo ex. Nulla facilisi. Nunc tincidunt ut quam vel blandit. Nullam nec turpis id arcu dapibus porttitor vel quis justo.",
"Ut quis aliquet diam. In imperdiet nulla eget ante vulputate, a fermentum ante gravida. Curabitur elementum posuere facilisis. Praesent faucibus lacus tincidunt quam iaculis pellentesque. Quisque porta tortor ut libero scelerisque tincidunt. Morbi ultrices porta pellentesque. Sed eget nibh congue, rhoncus risus nec, hendrerit enim. Etiam enim leo, facilisis pulvinar elementum ut, consequat vitae dui. Praesent ultricies a risus non elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In vehicula aliquet neque, nec viverra tellus pharetra sed. Nulla eu tempor ex, eu iaculis turpis. Donec ullamcorper suscipit lorem vitae commodo. Aenean posuere euismod ligula, id finibus nisi. Proin finibus orci eu dolor mattis aliquet."
]

export const medicationChoicesRaw: MedicationInterface[] = [
  makeMedication(1,"Percocet (Oxycodone/Acetaminophen)",info_fillter2),
  makeMedication(2,"Morphine",info_fillter1),
  makeMedication(3,"Dilauid (Hydromorphone)",info_fillter2),
  makeMedication(4,"Vicodin (Hydrocodone/Acetaminophen)",info_fillter1),
  makeMedication(5,"Tylenol (Acetaminophen)",info_fillter2),
  makeMedication(6,"Motrin (Ibuprofen)",info_fillter1),
  makeMedication(7,"Toradol (Ketorolac)",info_fillter2),
  makeMedication(8,"Demerol (Meperidine)",info_fillter1),
  makeMedication(9,"Ultram (Tramadol)",info_fillter2),
  makeMedication(10,"Neurontin (Gabapentin)",info_fillter1),
  makeMedication(11,"Oxycotin (Oxycodone)",info_fillter2),
  makeMedication(12,"Aleve (Naproxen)",info_fillter1)
]


const normalData = normalize(medicationChoicesRaw,medSchemaList);

export const medicationchoices: MedicationListInterface= normalData.entities.medication;

export const medicationchoiceIds = normalData.result;


