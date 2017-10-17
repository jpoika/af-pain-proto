export const getMedications = (state, ownProps) => state.medicationchoiceIds.map(mid => state.medicationchoices[mid]);

export const getSystemMedications = (state, ownProps) => {
  return getMedications(state, ownProps).filter(med => !med.userDefined)
}