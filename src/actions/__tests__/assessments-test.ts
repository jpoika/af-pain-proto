import {
  assessMoveStep,
  assessMarkPain,
  editAssessment,
  getLocationsPainDecreased,
  ASSESSMENT_EDIT
} from '../../actions/assessment';
import {makeAssessment} from '../../res/data/assessments'
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

  it('Ensures that pain reductions in a specific location are detected', function(done) {
     let currentState;
      const state1 = reducer(undefined,{type: '@123321)^439$$%^$$'}) as any;
      currentState = state1;
      const initAssessment:AssessmentInterface  = state1.assessments['1'];
      expect(initAssessment.step).toBe(0);
      const bodySection1 = state1.bodySections['1'];
      const bodySection3 = state1.bodySections['3'];
      const bodySection5 = state1.bodySections['4'];
      expect(bodySection1).toBeDefined();
      expect(bodySection3).toBeDefined();
      expect(bodySection5).toBeDefined();

      const painLvl5 = state1.painLevels['5'];
      // const painLvl6 = state1.painLevels['6'];
      // const painLvl7 = state1.painLevels['7'];
      const painLvl8 = state1.painLevels['8'];
      const painLvl9 = state1.painLevels['9'];
      const painLvl10 = state1.painLevels['10'];

      expect(painLvl5).toBeDefined();
      expect(painLvl8).toBeDefined();
      expect(painLvl10).toBeDefined();


      const dispatchMock = jest.fn();

      expect(initAssessment.bodySections[bodySection1.id]).toBeUndefined();
      assessMarkPain(initAssessment,bodySection1.id,painLvl9.id)(dispatchMock,() => state1)
        .then(changedAssessment => {
            expect(dispatchMock.mock.calls.length).toBe(1);
            expect(changedAssessment.bodySections[bodySection1.id]).toBeDefined();
            expect(changedAssessment.bodySections[bodySection1.id] === painLvl9.id).toBe(true);
            
            const dispatchAction = dispatchMock.mock.calls[0][0];
            expect(dispatchAction.type === ASSESSMENT_EDIT).toBe(true);
            return reducer(state1,dispatchAction)
        }).then((state2) => {
          currentState = state2;
          return editAssessment(makeAssessment(0,'later assessment 4321','newpain'),{})(dispatchMock,() => state2)
        }).then(secondAssessment => {

          expect(secondAssessment.id === 2).toBe(true);
          expect(getLocationsPainDecreased(secondAssessment,initAssessment,currentState.painLevels).length).toBe(0);
          return assessMarkPain(secondAssessment,bodySection1.id,painLvl8.id)(dispatchMock,() => currentState)
          
        }).then(changedSecondAssessment => {

          expect(getLocationsPainDecreased(changedSecondAssessment,initAssessment,currentState.painLevels).length).toBe(1);
          done();
        });

      

  })

})