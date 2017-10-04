import {createSelector} from 'reselect';
import {MessageInterface} from '../../../res/data/messages';
import {AssessmentInterface} from '../../../res/data/assessments';
import {BodySectionInterface} from '../../../res/data/body';

export const getPrompts = (state, ownProps) => {
  return state.messagePromptIds.map(mid => state.messagePrompts[mid]);
}

export const getOpenPrompts = (state, ownProps:{promptName?: string,[promName: string]: any}) => {
  const allPrompts = getPrompts(state, ownProps).filter(pmpt => !pmpt.acknowledged);
  if(ownProps.promptName){
    return allPrompts.filter(prompt => prompt.name === ownProps.promptName)
  }
  return allPrompts;
}

export const getFirstOpenPrompt = (state, ownProps) => {
  let prompts = getOpenPrompts(state, ownProps);
  return length > 0 ? prompts.shift() : null;
}

export const getMessages = (state, ownProps) => {
  return state.messageIds.map(mid => state.messages[mid]);
}
export const getPainReductions = (state, ownProps) => {
  return state.painReductionIds.map(pid => state.painReductions[pid]);
}

export const findPainReductions = (state, ownProps: {[propName: string]: any, assessment: AssessmentInterface, bodySection: BodySectionInterface}) => {
  const {assessment, bodySection} = ownProps;
  return getPainReductions(state, ownProps).filter(painR => {
    if(painR.assessmentId === assessment.id && painR.bodySectionId === bodySection.id){
      return true;
    }
    return false;
  }).pop()
}

export const getMessageById = (messageId: number) => {
  return (state, ownProps): MessageInterface => {
    return state.messages[messageId] === 'undefined' ? null : state.messages[messageId];
  }
}

export const getFirstOpenPromptByName = (promptName: String) => {
  return createSelector( 
    [getOpenPrompts],
    (openPrompts) => {
   
      return openPrompts.length > 0 ? openPrompts.filter((prmt) => {
                return prmt.name === promptName;
              })
              .pop() : null;
    }
  )
}
export const getFirstPrompt2 = createSelector( 
    [getFirstOpenPromptByName],
    (openPrompt) => {
      return openPrompt
    }
);

// export default isPromptOpen = (promptId) => {
//   return (state, ownProps) => {
  
//   }
// }