import AlertNurseDialog from '../appcomponents/AlertNurseDialog';
import {connect} from 'react-redux';
//import {alertNurse} from '../actions/nurse'
//import {makeMessage} from '../res/data/messages';
import {ackPrompt} from '../actions/messages';
//import {closePrompt} from '../actions/messages';
import {getFirstOpenPromptByName/*,getMessageById,findPainReductions*/} from './pain/selectors';
import {MessagePromptInterface} from '../res/data/messages';

const stateToProps = (state, ownProps) => {
  const openPrompt = getFirstOpenPromptByName('nurse_prompt')(state, ownProps);

  return {
    //open: isPromptOpen('nurse_prompt',state),
    prompt: openPrompt,
    messages: [],
    status: state.nurseSystem.status,
    //confirmMessage: getConfirmMessage('nurse_prompt',state)
  }
}

const dispatchToProps = (dispatch) => {
  return {
    clearPrompt: (prompt: MessagePromptInterface) => {
      dispatch(ackPrompt(prompt));
    }
    // closeNurseDialog: () => {  
    //   dispatch(closePrompt('nurse_prompt'));
    // },
    // alertNurse: () => {
    //   dispatch(alertNurse());
    // }
  }
}
export default connect(stateToProps,dispatchToProps)

(AlertNurseDialog);