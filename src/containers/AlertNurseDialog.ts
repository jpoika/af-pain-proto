import AlertNurseDialog from '../appcomponents/AlertNurseDialog';
import {connect} from 'react-redux';
import {alertNurseDialogueClose,alertNurse} from '../actions/nurse'

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

const getConfirmMessage = (nurseSystem, limit = 0) => {
  if(nurseSystem.status === 5){
    return `You've indicated you are experiencing intollerable pain. 
    Would you like to speak to a nurse`;
  }

  if(nurseSystem.status === 6){
    return `You've indicated pain in a new location. 
    Would you like to speak to a nurse`;
  }
  return 'Are you sure you would like to contact the nurse?'
}

const stateToProps = (state, ownProps) => {
  return {
    open: state.nurseSystem.dialogStatus > 0,
    status: state.nurseSystem.status,
    messages: getMessages(state.nurseSystem,3),
    confirmMessage: getConfirmMessage(state.nurseSystem)
  }
}
const dispatchToProps = (dispatch) => {
  return {
    closeNurseDialog: () => dispatch(alertNurseDialogueClose()),
    alertNurse: () => {
      dispatch(alertNurse());
    },
    cancelAlertNurse: () => {
      //TODO
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(AlertNurseDialog);