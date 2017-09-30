import SeverePainPrompt from '../../appcomponents/pain/DecreasedPainPrompt';
import {connect} from 'react-redux';
import {ackPrompt} from '../../actions/messages';
import {getFirstOpenPromptByName,getMessageById} from '../pain/selectors';
import {MessagePromptInterface} from '../../res/data/messages';


const stateToProps = (state, ownProps) => {
  const openPrompt = getFirstOpenPromptByName('pain_location_decreased_prompt')(state, ownProps);
  const message = openPrompt ? getMessageById(openPrompt.messageId)(state, ownProps) : null;

  return {
    open: openPrompt ? true : false,
    prompt: openPrompt,
    message: message
  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
    clearPrompt: (prompt: MessagePromptInterface) => {
      dispatch(ackPrompt(prompt));
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(SeverePainPrompt);