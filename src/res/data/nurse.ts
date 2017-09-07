export interface NurseSystemStatus {
  id: number;
  title: string;
  status: number
}


export const makeNurseSystemStatus = (id:number,title:string,status: number) => {
  return {
    id,
    title,
    status
  }
}


export const statuses:NurseSystemStatus[] = [
  makeNurseSystemStatus(1,'no active alert',0),
  makeNurseSystemStatus(2,'waiting for response',1),
  makeNurseSystemStatus(3,'nurse alerted',2),
  makeNurseSystemStatus(4,'alert timeout',3),
  makeNurseSystemStatus(5,'user_confirm',4),
];

