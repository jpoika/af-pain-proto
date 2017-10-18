import {
  assessMoveStep,
  assessMarkPain,
  ASSESSMENT_EDIT
} from '../../actions/assessment';
import reducer from '../../reducers';
import {AssessmentInterface} from '../../res/data/assessments';

describe('Assessment Actions Test', () => {
  it('Should automatically have an initial assessment record with id == 1', function() {
      const state1 = reducer(undefined,{}) as any;
      expect(state1.assessments['1']).toBeDefined();
      expect(state1.assessments['1'].id).toBe(1);
  });

  it('Various actions should altimately call dispatch with ASSESSMENT_EDIT action',function() {
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

  it('Ensures that pain reductions in a specific location are detected', function() {
      const state1 = reducer(undefined,{type: '@123321'}) as any;
      const initAssessmentz:AssessmentInterface  = state1.assessments['1'];
      expect(initAssessmentz.step).toBe(0);
      // const bodySection1 = state1.bodySections['1'];
      // const bodySection3 = state1.bodySections['3'];
      // const bodySection5 = state1.bodySections['4'];
      // expect(bodySection1).toBeDefined();
      // expect(bodySection3).toBeDefined();
      // expect(bodySection5).toBeDefined();

      // const painLvl5 = state1.painLevels['5'];
      // const painLvl6 = state1.painLevels['6'];
      // const painLvl7 = state1.painLevels['7'];
      // const painLvl8 = state1.painLevels['8'];
      // const painLvl9 = state1.painLevels['9'];
      // const painLvl10 = state1.painLevels['10'];

      // expect(painLvl5).toBeDefined();
      // expect(painLvl8).toBeDefined();
      // expect(painLvl10).toBeDefined();
      // assessMarkPain(initAssessment,bodySection1.id,painLvl9.id)
  })

})