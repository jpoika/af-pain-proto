//import {createSelector} from 'reselect';


export const getAssessements = (state, ownProps) => state.assessmentIds.map(aid => state.assessments[aid])
            .filter(assessm => assessm);

export const getCompleteAssessements = (state, ownProps) => getAssessements(state, ownProps)
                                          .filter(assessm => assessm.isComplete);

export const getInCompleteAssessements = (state, ownProps) => getAssessements(state, ownProps)
                                          .filter(assessm => !assessm.isComplete);

export const getNonInitialAssessements = (state, ownProps) => getAssessements(state, ownProps)
                                          .filter(assessm => assessm.type !== 'initial');

export const getNonInitialAssessementsType = (state, ownProps:{type: string}) => getNonInitialAssessements(state, ownProps)
                                          .filter(assessm => assessm.type === ownProps.type);

export const getLastNonInitialAssessementsType = (state, ownProps:{type: string}) => getNonInitialAssessementsType(state, ownProps).pop();
export const getLastNonInitialIncompleteAssessementsByType = (state, ownProps:{type: string}) => getNonInitialAssessements(state, ownProps)
                                                             .filter(assessm => !assessm.isComplete).pop();


// export const searchHospitals = createSelector( //just searching titles for now
//   [getHospitals,getHospitalSearchText],
//   (hospitals,searchText) => {
//     return hospitals.filter((hospital) => {
//         return hospital.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
//     });
//   }
// );

