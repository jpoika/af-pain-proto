
export const NOTIFICATION_EDIT = 'T2.EDIT_NOTIFICATION';
export const NOTIFICATION_TRIGGERED = 'T2.NOTIFICATION_TRIGGERED';
//export const NOTIFICATION_DELETE = 'T2.NOTIFICATION_DELETE';
export const NOTIFICATION_WAS_DELETED = 'T2.NOTIFICATION_DELETED';
export const NOTIFICATION_CLEAR_ALL = 'T2.NOTIFICATION_CLEAR_ALL';

import {nextId} from './_helper';


export const scheduleNotification = (title,text,deadline, data = {}) => {

  return (dispatch,getState, {isReady, plugins}) => {
    const scheduleArg = {
        id: nextId(getState().notificationIds),
        title,
        text,
        at: deadline,
        data: data,
        sound: 'file://' + require('../res/audio/alert_chime.mp3')
    }
    console.log('scheduling with cordova plugin');
    isReady && plugins.notification.schedule(scheduleArg);
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

export const clearAllNotifications = () => {
  return (dispatch,getState, {isReady, plugins}) => {
    if(isReady){
      plugins.notification.clearAll().then(() => {
        dispatch({
            type: NOTIFICATION_CLEAR_ALL
          });
      }).catch((e) => {
         console.log(e);
      });
    }


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
    if(!isReady){
      return;
    }
    plugins.notification.clear(scheduleId).then((result) => {
      dispatch(notificationWasDeleted(scheduleId));
    }).catch((err)=> {
                      
       console.log('Failed clearing notification',err);
    });
  }
}

