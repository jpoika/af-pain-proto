import BodyMap from '../appcomponents/BodyPinMap';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { assessMarkPain } from '../actions/assessment';
import {PainLevelInterface} from '../res/data/pain';
import {frontBodySectionIds, backBodySectionIds} from '../res/data/body';

const frontBodyImage = require('../res/images/body_map/Front_326.png');
const backBodyImage = require('../res/images/body_map/Back_326.png');
const getBodySections = (allBodySections,sectionIds) => {
    return sectionIds.map((sid) => {
      return allBodySections[sid]
    });
};

const stateToProps = (state, ownProps) => {
  const initAssessmentId = 1;
  return {
    title: ownProps.side === 'back' ? 'Pain Map Back':'Pain Map Front',
    bodySections: ownProps.side === 'back' ? getBodySections(state.bodySections,backBodySectionIds) : getBodySections(state.bodySections,frontBodySectionIds),
    bodyImage: ownProps.side === 'back' ? backBodyImage : frontBodyImage
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