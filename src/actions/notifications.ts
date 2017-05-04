
export const NOTIFICATION_EDIT = 'T2.EDIT_NOTIFICATION';
export const NOTIFICATION_TRIGGERED = 'T2.NOTIFICATION_TRIGGERED';
//export const NOTIFICATION_DELETE = 'T2.NOTIFICATION_DELETE';
export const NOTIFICATION_WAS_DELETED = 'T2.NOTIFICATION_DELETED';

import {nextId} from './_helper';


export const scheduleNotification = (title,text,deadline) => {

  return (dispatch,getState, {isReady, notification}) => {
    const newId = nextId(getState().notificationIds);
    const scheduleArg = {
        id: nextId(getState().notificationIds),
        title,
        text,
        at: deadline,
        data: { meetingId:"#123FG8" },
        //sound: require('../res/audio/alert_chime.mp3')
    }
    console.log('scheduling with cordova plugin');
    notification.schedule(scheduleArg);
    dispatch(editNotification(scheduleArg));
  }
}


export const editNotification = (schedule) => {
  return {
    type: NOTIFICATION_EDIT,
    schedule
  }
}

export const deleteNotification = (id) => {
  return (dispatch,getState, {isReady, notification}) => {

  }
}