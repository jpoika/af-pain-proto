//import {createSelector} from 'reselect';


export const getPrompt = (state,ownProps:{promptId: string, [propName: string]: any}) => {
  return typeof state.messagePrompts[ownProps.promptId] !== 'undefined' ? state.messagePrompts[ownProps.promptId]: null;
}