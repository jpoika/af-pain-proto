import SeverePainPrompt from '../../appcomponents/pain/SeverePainPrompt';
import {connect} from 'react-redux';
import {alertNurse} from '../../actions/nurse'
import {makeMessage} from '../../res/data/messages';
import {closePrompt} from '../../actions/messages';


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
  return {
    open: false //isPromptOpen('severe_pain_prompt',state),
    // messages: [],
    // status: state.nurseSystem.status,
    // confirmMessage: getConfirmMessage('nurse_prompt',state)
  }
}

const dispatchToProps = (dispatch) => {
  return {
    setSeverePain: (hasSeverePain: boolean) => {
        if(hasSeverePain){
          dispatch(alertNurse());
        } else {
          dispatch(closePrompt('severe_pain_prompt'));
        }
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(SeverePainPrompt);