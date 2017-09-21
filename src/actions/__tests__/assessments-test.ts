import {assessMoveStep,ASSESSMENT_EDIT} from '../../actions/assessment';
import reducer from '../../reducers';
import {AssessmentInterface} from '../../res/data/assessments';

describe('Assessment Actions Test', () => {
  it('Should automatically have an initial assessment record with id == 1', () => {
      const state1 = reducer(undefined,{}) as any;
      expect(state1.assessments['1']).toBeDefined();
      expect(state1.assessments['1'].id).toBe(1);
  });

  it('Various actions should altimately call dispatch with ASSESSMENT_EDIT action',() => {
      const state1 = reducer(undefined,{}) as any;
      const initAssessment:AssessmentInterface  = state1.assessments['1'];
      expect(initAssessment.step).toBe(0);
      const thunkStep = assessMoveStep(1,initAssessment);
      const dispatchMock = jest.fn();

      thunkStep(dispatchMock,state1);

      expect(dispatchMock.mock.calls.length).toBe(1);

      const editAction = dispatchMock.mock.calls[0][0];
      expect(editAction.type).toEqual(ASSESSMENT_EDIT);




  })
})