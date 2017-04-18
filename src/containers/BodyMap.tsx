import BodyMap from '../appcomponents/BodyMap';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { assessMarkPain } from '../actions/assessment';
import {PainLevelInterface} from '../res/data/pain';


const stateToProps = (state, ownProps) => {
  const initAssessmentId = 1;
  return {
    title: 'Body Map',
    bodySections: state.bodySections,
    
  }
}
const dispatchToProps = (dispatch) => {
  return {
    markPain: (assessmentId: number, sectionId: number, painLevel: PainLevelInterface) => {
      console.log(painLevel);
      dispatch(assessMarkPain(assessmentId,sectionId,painLevel.id));
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(BodyMap);