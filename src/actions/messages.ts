export const MESSAGE_PROMPT_USER = 'T2.MESSAGE_PROMPT_USER';
export const MESSAGE_UPDATE_PROMPT = 'T2.MESSAGE_UPDATE_PROMPT';
export const MESSAGE_PROMPT_CLEAR = 'T2.MESSAGE_PROMPT_CLEAR';
export const MESSAGE_PROMPT_ACK = 'T2.MESSAGE_PROMPT_ACK';
export const MESSAGE_PROMPT_EDIT = 'T2.MESSAGE_PROMPT_EDIT';
export const MESSAGE_PROMPT_CLEAR_ALL = 'T2.MESSAGE_PROMPT_CLEAR_ALL';


export const MESSAGE_CREATE = 'T2.MESSAGE_CREATE';
export const MESSAGE_DELETE = 'T2.MESSAGE_DELETE';
import {makeMessagePrompt,makeMessage,MessagePromptInterface} from '../res/data/messages';
import {getPrompt} from '../containers/prompts/selectors';
import {nextId} from './_helper';

const isPromptMaxed = (promptId: string, state: any) => {
  const prompt = typeof state.messagePrompts[promptId] !== 'undefined' ? state.messagePrompts[promptId] : null;
  if(!prompt){
    return false;
  }
  return prompt.count >= prompt.maxRepeat;
}

export const messagePromptUser = (id: string, name: string, maxRepeat: number, message: string|string[]) => {

    return (dispatch,getState) => {
       const currentPrompt = getPrompt(getState(),{promptId: id});

       let messageId = !currentPrompt ? dispatch(messageCreate(message)) : currentPrompt.messageId;
       let messagePrompt = currentPrompt ? currentPrompt : makeMessagePrompt(id,name,maxRepeat,messageId);
       
       dispatch({
                  type: MESSAGE_UPDATE_PROMPT,
                  prompt: messagePrompt
                });
       if(maxRepeat === 0 || !isPromptMaxed(id,getState())) {
           dispatch({
                      type: MESSAGE_PROMPT_USER,
                      prompt: messagePrompt
                    });
       }

    }
} 

export const messageCreate = (messageString: string|string[]) => {
    return (dispatch,getState): number => {
      const id = nextId(getState().messageIds);
      const message = makeMessage(id,messageString);
      dispatch({
        type: MESSAGE_CREATE,
        message
      });
      return id;
    }

} 

export const messageDelete = (messageId: number) => {
  return {
    type: MESSAGE_DELETE,
    messageId
  }
}

export const closePrompt = (promptName: string) => {
  return {
    type: MESSAGE_PROMPT_CLEAR,
    promptName
  }
}

export const ackPrompt = (prompt: MessagePromptInterface) => {
  return editPrompt(prompt,{acknowledged: true})
}

export const editPrompt = (prompt: MessagePromptInterface,newProps) => {
  return (dispatch,getState) => {
    Object.assign(prompt,newProps);
    return dispatch(
            {
              type: MESSAGE_PROMPT_EDIT,
              prompt: prompt
             }
          );

  }
}
