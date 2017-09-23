export interface MessageInterface {
  id: number;
  message: string[];
}

export interface MessagePromptInterface {
  id: string;
  name: string;
  messageId: number;
  maxRepeat: number; //0 == No Limit
  count: number;
  acknowledged: boolean
}


export const makeMessage = (id: number, message: any): MessageInterface => {
  return {
    id,
    message: message.constructor === Array ? message : [message]
  }
}

export const makeMessagePrompt = (id: string, name: string, maxRepeat: number, messageId: number):MessagePromptInterface => {
  return {
    id,
    name,
    maxRepeat,
    messageId,
    count: 0,
    acknowledged: false
  }
}
