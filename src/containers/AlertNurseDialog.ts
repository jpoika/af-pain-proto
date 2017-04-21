import AlertNurseDialog from '../appcomponents/AlertNurseDialog';
import {connect} from 'react-redux';
import {alertNurseDialogueClose} from '../actions/nurse'

const stateToProps = (state, ownProps) => {
  return {
    open: state.nurseSystem.dialogStatus > 0
  }
}
const dispatchToProps = (dispatch) => {
  return {
    closeNurseDialog: () => dispatch(alertNurseDialogueClose())
  }
}
export default connect(stateToProps,dispatchToProps)

(AlertNurseDialog);