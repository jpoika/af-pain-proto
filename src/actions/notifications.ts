
export const NOTIFICATION_EDIT = 'T2.EDIT_NOTIFICATION';
export const NOTIFICATION_TRIGGERED = 'T2.NOTIFICATION_TRIGGERED';
//export const NOTIFICATION_DELETE = 'T2.NOTIFICATION_DELETE';
export const NOTIFICATION_WAS_DELETED = 'T2.NOTIFICATION_DELETED';

import {nextId} from './_helper';


export const scheduleNotification = (title,text,deadline, data = { meetingId:"#123FG8" }) => {

  return (dispatch,getState, {isReady, plugins}) => {
    const newId = nextId(getState().notificationIds);
    const scheduleArg = {
        id: nextId(getState().notificationIds),
        title,
        text,
        at: deadline,
        data: data,
        sound: 'file://' + require('../res/audio/alert_chime.mp3')
    }
    console.log('scheduling with cordova plugin');
    plugins.notification.schedule(scheduleArg);
    dispatch(editNotification(scheduleArg,deadline.getTime()));
  }
}


export const editNotification = (schedule,timestamp) => {
  return {
    type: NOTIFICATION_EDIT,
    schedule,
    timestamp
  }
}

export const notificationWasDeleted = (scheduleId) => {
  return {
    type: NOTIFICATION_WAS_DELETED,
    scheduleId
  }
}

export const deleteNotification = (scheduleId: number) => {

  return (dispatch,getState, {isReady, plugins}) => {
    plugins.notification.clear(scheduleId).then((result) => {
      dispatch(notificationWasDeleted(scheduleId));
    }).catch((err)=> {
                      
       console.log('Failed clearing notification',err);
    });
  }
}

