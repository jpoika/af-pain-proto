import SeverePainPrompt from '../../appcomponents/pain/SeverePainPrompt';
import {connect} from 'react-redux';
import {alertNurse} from '../../actions/nurse'
//import {makeMessage} from '../../res/data/messages';
import {closePrompt,ackPrompt} from '../../actions/messages';
import {assessmentPromptSeverePain} from '../../actions/assessment';
import {getFirstOpenPromptByName,getMessageById} from './selectors';
import {MessagePromptInterface} from '../../res/data/messages';


// const getConfirmMessage = (promptName,state) => {
//   const messageId = typeof state.messageDialogs[promptName] !== 'undefined' ? state.messageDialogs[promptName].messageId : null;
//   if(messageId && state.messages[messageId] !== 'undefined'){
//     return state.messages[messageId];
//   }
//   return makeMessage(0,'Are you sure you would like to contact the nurse?')
// }

// const isPromptOpen = (promptName,state) => {
//   return typeof state.messageDialogs[promptName] !== 'undefined' ? state.messageDialogs[promptName].open : false;
// }

const stateToProps = (state, ownProps) => {
  const openPrompt = getFirstOpenPromptByName('severe_pain_assess_prompt')(state, ownProps);
  const message = openPrompt ? getMessageById(openPrompt.messageId)(state, ownProps) : null;
  console.log(openPrompt,message);
  return {
    open: openPrompt ? true : false,
    prompt: openPrompt,
    message: message
    // status: state.nurseSystem.status,
    // confirmMessage: getConfirmMessage('nurse_prompt',state)
  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
    setSeverePain: (hasSeverePain: boolean) => {
        if(hasSeverePain){
          dispatch(alertNurse());
        } else {
          dispatch(closePrompt('severe_pain_prompt'));
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

(SeverePainPrompt);