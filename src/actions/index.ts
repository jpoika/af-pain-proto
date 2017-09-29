export const SHOW_FLASH_MESSAGE = 'T2.SHOW_FLASH_MESSAGE';
export const HIDE_FLASH_MESSAGE = 'T2.HIDE_FLASH_MESSAGE';
export const FLAG_AS_AUTHENTICATED = 'T2.FLAG_USER_AS_AUTHENTICATED';
export const FLAG_AS_DEAUTHENTICATED = 'T2.FLAG_USER_AS_DEAUTHENTICATED';
export const UPDATE_ACCOUNT_INFO = 'T2.UPDATE_ACCOUNT_INFO';
export const SET_USERNAME = 'T2.SET_USERNAME';
export const RESET_APP = 'T2.RESET_APP';
export const USER_ENABLE_DO_NOT_DISTURB = 'T2.USER_ENABLE_DO_NOT_DISTURB';
export const USER_DISABLE_DO_NOT_DISTURB = 'T2.USER_DISABLE_DO_NOT_DISTURB';
export const T2_APP_MESSAGE_START = 'T2.APP_MESSAGE_START';
export const T2_APP_MESSAGE_CLEAR = 'T2.APP_MESSAGE_CLEAR';
export const WINDOW_RESIZE = 'T2.WINDOW_RESIZE';
export const SET_PAGE_TITLE = 'T2.SET_PAGE_TITLE';
export const REDIRECT_TO = 'T2.REDIRECT_TO';
export const REDIRECT_CLEAR = 'T2.REDIRECT_CLEAR';

export const USER_SET_MEDICATION_STATUS = 'T2.USER_SET_MEDICATION_STATUS';

import {AccountInterface} from '../res/data/account'

export const setPageTitle = (title:string) => {
  return {
    type: SET_PAGE_TITLE,
    title: title
  }
}

export const windowResize = (width:number,height: number) => {
  return {
    type: WINDOW_RESIZE,
    width,
    height
  }
}

export const messageStart = (message) => {
  return {
    type: T2_APP_MESSAGE_START,
    message
  };
}

export const messageClear = () => {
  return {
    type: T2_APP_MESSAGE_CLEAR
  };
}


var timeOutId = null
export const sendMessage = (message) => {
  
  return (dispatch,getState,extraArgs) => {
   
    dispatch(messageStart(message));

    if(timeOutId){
        clearTimeout(timeOutId)
    }
    
    timeOutId = setTimeout(
                    () => {dispatch(messageClear())}
                    ,3000
                )
  }
};

export const flagUserAuthenticated = () => {
  return {
    type: FLAG_AS_AUTHENTICATED
  }
}

export const userEnableDoNotDisturb = () => {
  return {
    type: USER_ENABLE_DO_NOT_DISTURB
  }
}

export const userDisableDoNotDisturb = () => {
  return {
    type: USER_DISABLE_DO_NOT_DISTURB
  }
}

export const redirectTo = (path, method: string = 'push') => {
  return {
    type: REDIRECT_TO,
    path,
    method
  }
}
export const clearRedirect = () => {
  return {
    type: REDIRECT_CLEAR
  }
}


export const userSetMedicationStatus = (status) => {
  return {
    type: USER_SET_MEDICATION_STATUS,
    status
  }
}

export const flagUserDeauthenticated = () => {
  return {
    type: FLAG_AS_DEAUTHENTICATED
  }
}

export const updateAccountInfo = (account: AccountInterface) => {
  return {
    type: UPDATE_ACCOUNT_INFO,
    account
  }
}

export const setUsername = (username: string) => {
  return {
    type: SET_USERNAME,
    username
  }
}

export const deleteAccount = () => {
  return {
    type: RESET_APP
  }
}

