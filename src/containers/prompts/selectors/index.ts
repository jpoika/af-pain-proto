import {createSelector} from 'reselect';
import {MessageInterface} from '../../../res/data/messages';

export const getMessageById = (messageId: number) => {
  return (state, ownProps): MessageInterface => {
    return state.messages[messageId] === 'undefined' ? null : state.messages[messageId];
  }
}
export const getPrompt = (state,ownProps:{promptId: string, [propName: string]: any}) => {
  return typeof state.messagePrompts[ownProps.promptId] !== 'undefined' ? state.messagePrompts[ownProps.promptId]: null;
}
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