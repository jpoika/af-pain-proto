import BodyMap from '../appcomponents/BodyMap';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { assessMarkPain } from '../actions/assessment';
import {PainLevelInterface} from '../res/data/pain';
import {frontBodySectionIds, backBodySectionIds} from '../res/data/body';

const getBodySections = (allBodySections,sectionIds) => {
    return sectionIds.map((sid) => {
      return allBodySections[sid]
    });
};

const stateToProps = (state, ownProps) => {
  const initAssessmentId = 1;
  return {
    title: 'Pain Map Front',
    bodySections: ownProps.side === 'back' ? getBodySections(state.bodySections,backBodySectionIds) : getBodySections(state.bodySections,frontBodySectionIds)
  }
}
const dispatchToProps = (dispatch) => {
  return {
    markPain: (assessmentId: number, side: string, sectionId: number, painLevel: PainLevelInterface) => {
      console.log(painLevel);
      dispatch(assessMarkPain(assessmentId,side,sectionId,painLevel.id));
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(BodyMap);