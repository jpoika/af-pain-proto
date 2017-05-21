import {T2_APP_MESSAGE_CLEAR, T2_APP_MESSAGE_START} from '../actions';
import {REHYDRATE} from 'redux-persist/constants'
const defaultView = {
  flash: {
    message: '',
    open: false
  }
};


const view = (state = defaultView, action) => {

  switch (action.type) {
    case T2_APP_MESSAGE_START:
      //state.flash = {...state.flash, message: action.message, open: true}
      //state = {...state};
      state = {...state,flash: {message: action.message, open: true}};
      break;
    case T2_APP_MESSAGE_CLEAR:
    case REHYDRATE:

      state = {...state,flash: {message: '',open: false}};
      break;
    default:
      // code...
      break;
  }
  
  return state;
}

export default view;



