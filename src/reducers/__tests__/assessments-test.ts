import {assessMarkComplete,editAssessment,ASSESSMENT_EDIT, assessMoveStep} from '../../actions/assessment';
import {assessments,assessmentIds} from '../assessments';
import {makeAssessment} from '../../res/data/assessments';
import reducer from '../../reducers';
import {AssessmentInterface} from '../../res/data/assessments';

describe('Assessment Reducer Tests', () => {
  it('Should automatically have an initial assessment record with id == 1', () => {
       let assessmentsState = assessments(undefined,{});
       let assessmentIdsState = assessmentIds(undefined,{});
       expect(assessmentIdsState.length).toBe(1);
       expect(assessmentsState['1']).toEqual(makeAssessment(1,'','initial'));
  });

  it('Should mark an assessment as complete', () => {
       const assessmentsState1 = assessments(undefined,{});

       expect(assessmentsState1['1'].isComplete).toBe(false);

       const dispatchMock = jest.fn();
       //const dispatchMock2 = jest.fn();
       const getStateMock = () => ({assessments: assessmentsState1});
       const thunk = assessMarkComplete(assessmentsState1['1']);

       thunk(dispatchMock,getStateMock); //call the thunk

       expect(dispatchMock.mock.calls.length).toBe(2); //dispatch should be called twice

       const markCompleteThunk = dispatchMock.mock.calls[1][0]; //extract the action we want to test


       markCompleteThunk(dispatchMock,getStateMock);

       expect(dispatchMock.mock.calls.length).toBe(3); //dispatch should be called for 3rd time

       const editAssessmentAction = dispatchMock.mock.calls[2][0];
       
       //"Dispatch the extracted action against the state"
       const assessmentsState2 = assessments(assessmentsState1,editAssessmentAction);
       //finally check that isComplete === true
       expect(assessmentsState2['1'].isComplete).toBe(true); 
  });
  it('Should add an assessment', () => {
     let assessmentsState = assessments(undefined,{});
     let assessmentIdsState = assessmentIds(undefined,{});
     //check initial assessment count. Should be == 1
     expect(assessmentIdsState.length).toBe(1);




     const dispatchMock = jest.fn();
     const getStateMock = () => ({assessments: assessmentsState, assessmentIds: assessmentIdsState});
     //get thunk and call it

     const editAssessmentThunk = editAssessment(makeAssessment(0,'','newpain'),{})
    
     editAssessmentThunk(dispatchMock,getStateMock); 
     //extract the action object
     const editAssessmentAction = dispatchMock.mock.calls[0][0]; 
     //this is the newly created assessment (not added yet)
     const newAssessment = editAssessmentAction.assessment;
     //call action to add new assessment
     assessmentsState = assessments(assessmentsState,editAssessmentAction);
     assessmentIdsState = assessmentIds(assessmentIdsState,editAssessmentAction);
     //there should now be an additional assessment
     expect(assessmentIdsState.length).toBe(2);
     expect(assessmentsState['2']).toEqual(newAssessment);
     
  });
  it('Advance the intial assessment from step 1 to step 2',() => {
      const state1 = reducer(undefined,{}) as any;
      const initAssessment:AssessmentInterface  = state1.assessments['1'];
      expect(initAssessment.step).toBe(0);
      const thunkStep = assessMoveStep(1,initAssessment);
      const dispatchMock = jest.fn();

      thunkStep(dispatchMock,state1);

      expect(dispatchMock.mock.calls.length).toBe(1);

      const editAction = dispatchMock.mock.calls[0][0];
      expect(editAction.type).toEqual(ASSESSMENT_EDIT);

      const state2 = reducer(undefined,editAction) as any;

      expect(state2.assessments['1'].step).toBe(1);


  })

  /*
  it('Should only add a new assessment if there is not already an incomplete one', () => {
     const assessmentsState = assessments(undefined,{});
     const assessmentIdsState = assessmentIds(undefined,{});


  });
  */
})
