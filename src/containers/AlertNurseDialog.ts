import AlertNurseDialog from '../appcomponents/AlertNurseDialog';
import {connect} from 'react-redux';
import {alertNurse} from '../actions/nurse'
import {makeMessage} from '../res/data/messages';
import {closePrompt} from '../actions/messages';

/*
const getLastMessage = (nurseSystem) => {
  return nurseSystem.messageIds.length ? 
                nurseSystem.messageIds.map(mid => nurseSystem.messages[mid]).pop()
                :
                null
                ;
}
const getMessages = (nurseSystem, limit = 0) => {
  let messages = nurseSystem.messageIds.map(mid => nurseSystem.messages[mid]);
  if(limit){
    return messages.slice(0, limit)
  }
}
*/

const getConfirmMessage = (promptName,state) => {
  const messageId = typeof state.messageDialogs[promptName] !== 'undefined' ? state.messageDialogs[promptName].messageId : null;
  if(messageId && state.messages[messageId] !== 'undefined'){
    return state.messages[messageId];
  }
  return makeMessage(0,'Are you sure you would like to contact the nurse?')
}

const isPromptOpen = (promptName,state) => {
  return typeof state.messageDialogs[promptName] !== 'undefined' ? state.messageDialogs[promptName].open : false;
}

const stateToProps = (state, ownProps) => {
  return {
    open: isPromptOpen('nurse_prompt',state),
    messages: [],
    status: state.nurseSystem.status,
    confirmMessage: getConfirmMessage('nurse_prompt',state)
  }
}
const dispatchToProps = (dispatch) => {
  return {
    closeNurseDialog: () => {  
      dispatch(closePrompt('nurse_prompt'));
    },
    alertNurse: () => {
      dispatch(alertNurse());
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(AlertNurseDialog);