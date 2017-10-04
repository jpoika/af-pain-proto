export interface PainReductionInterface{
  id: number;
  assessmentId: number;
  bodySectionId: number;
  timestamp: number; //epock timestamp
  reasons: string[];
}

export interface PainReductionTree {
  [propName: string]: PainReductionInterface;
}


export const makePainReduction = (id: number, assessmentId: number, bodySectionId: number, reasons: string[] = []): PainReductionInterface => {
  const timestampObject = new Date();
  return {
    id,
    assessmentId,
    bodySectionId,
    timestamp: timestampObject.getTime(),
    reasons
  }
}