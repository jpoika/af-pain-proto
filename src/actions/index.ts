export const SHOW_FLASH_MESSAGE = 'T2.SHOW_FLASH_MESSAGE';
export const HIDE_FLASH_MESSAGE = 'T2.HIDE_FLASH_MESSAGE';
export const FLAG_AS_AUTHENTICATED = 'T2.FLAG_USER_AS_AUTHENTICATED';
export const FLAG_AS_DEAUTHENTICATED = 'T2.FLAG_USER_AS_DEAUTHENTICATED';
export const UPDATE_ACCOUNT_INFO = 'T2.UPDATE_ACCOUNT_INFO';
export const SET_USERNAME = 'T2.SET_USERNAME';

import {AccountInterface} from '../res/data/account'
export const flagUserAuthenticated = () => {
  return {
    type: FLAG_AS_AUTHENTICATED
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

