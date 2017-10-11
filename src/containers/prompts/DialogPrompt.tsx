import DialogPrompt from '../../appcomponents/prompts/DialogPrompt';
import {connect} from 'react-redux';
import {alertNurse} from '../../actions/nurse'
import {ackPrompt} from '../../actions/messages';
import {assessmentPromptSeverePain} from '../../actions/assessment';
import {MessagePromptInterface} from '../../res/data/messages';
import {getFirstOpenPromptByName,getMessageById} from './selectors'

const stateToProps = (state, ownProps) => {
  const openPrompt = getFirstOpenPromptByName('severe_pain_assess_prompt')(state, ownProps);
  const message = openPrompt ? getMessageById(openPrompt.messageId)(state, ownProps) : null;

  return {
    open: openPrompt ? true : false,
    prompt: openPrompt,
    message: message
  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
    setSeverePain: (hasSeverePain: boolean) => {
        if(hasSeverePain){
          dispatch(alertNurse());
        }
    },
    clearPrompt: (prompt: MessagePromptInterface) => {
      dispatch(ackPrompt(prompt));
    },
    checkForPrompt: () => {
       dispatch(assessmentPromptSeverePain(ownProps.assessment));
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(DialogPrompt);