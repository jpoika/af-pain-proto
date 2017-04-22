import AlertNurseDialog from '../appcomponents/AlertNurseDialog';
import {connect} from 'react-redux';
import {alertNurseDialogueClose} from '../actions/nurse'

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

const stateToProps = (state, ownProps) => {
  return {
    open: state.nurseSystem.dialogStatus > 0,
    status: state.nurseSystem.status,
    messages: getMessages(state.nurseSystem,3)
  }
}
const dispatchToProps = (dispatch) => {
  return {
    closeNurseDialog: () => dispatch(alertNurseDialogueClose())
  }
}
export default connect(stateToProps,dispatchToProps)

(AlertNurseDialog);