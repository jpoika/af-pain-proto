import {createSelector} from 'reselect';


export const getAssessements = (state, ownProps) => state.assessmentIds.map(aid => state.assessments[aid])
            .filter(assessm => assessm);

export const getCompleteAssessements = (state, ownProps) => getAssessements(state, ownProps)
                                          .filter(assessm => assessm.isComplete);

export const getInCompleteAssessements = (state, ownProps) => getAssessements(state, ownProps)
                                          .filter(assessm => !assessm.isComplete);

export const getPreviousCompletedAssessmentsDateAscending = (state, ownProps) => {
                return getCompleteAssessements(state, ownProps).sort((a,b) => {
                    if(a.completedOn > b.completedOn){
                      return 1;
                    }
                    if(a.completedOn < b.completedOn){
                      return -1;
                    }
                    return 0;
                })
}

export const getNonInitialAssessements = (state, ownProps) => getAssessements(state, ownProps)
                                          .filter(assessm => assessm.type !== 'initial');

export const getNonInitialAssessementsType = (state, ownProps:{type: string}) => getNonInitialAssessements(state, ownProps)
                                          .filter(assessm => assessm.type === ownProps.type);

export const getLastNonInitialAssessementsType = (state, ownProps:{type: string}) => getNonInitialAssessementsType(state, ownProps).pop();
export const getLastNonInitialIncompleteAssessementsByType = (state, ownProps:{type: string}) => getNonInitialAssessements(state, ownProps)
                                                             .filter(assessm => !assessm.isComplete).pop();

export const getPreviousCompletedAssessment = (assessment:{id: number}) => {
  return createSelector( 
    [getPreviousCompletedAssessmentsDateAscending],
    (prevAssessments) => {
      console.log(prevAssessments);
      return prevAssessments.filter((assessm) => {
                return assessm.id !== assessment.id
              })
              .pop();
    }
  )
}

