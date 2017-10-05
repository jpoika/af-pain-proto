import SeverePainPrompt from '../../appcomponents/pain/DecreasedPainPrompt';
import {connect} from 'react-redux';
import {ackPrompt} from '../../actions/messages';
import {editPainReduction} from '../../actions'
import {makePainReduction, PainReductionInterface} from '../../res/data/painReduction'
import {getFirstOpenPromptByName,getMessageById,findPainReductions} from '../pain/selectors';
import {MessagePromptInterface} from '../../res/data/messages';


const stateToProps = (state, ownProps) => {
  const openPrompt = getFirstOpenPromptByName('pain_location_decreased_prompt')(state, ownProps);
  const message = openPrompt ? getMessageById(openPrompt.messageId)(state, ownProps) : null;
  const currPainReduction = ownProps.bodySection ? findPainReductions(state,ownProps) : null;
  const {assessment,bodySection} = ownProps;

  return {
    open: openPrompt ? true : false,
    prompt: openPrompt,
    message: message,
    painReduction: currPainReduction ? currPainReduction :  makePainReduction(0,assessment.id,bodySection ? bodySection.id : 0,[])
  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
    clearPrompt: (prompt: MessagePromptInterface) => {
      dispatch(ackPrompt(prompt));
    },
    logPainReduction: (reasons: string[], painReduction: PainReductionInterface) => {
      if(reasons.length){
        dispatch(editPainReduction(painReduction,{reasons}));
      }
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(SeverePainPrompt);