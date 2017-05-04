import {NOTIFICATION_EDIT,NOTIFICATION_WAS_DELETED} from '../actions/notifications';
import {arrayPushUnique, arrayRemove} from './_helpers';
const defaultNotifications = {

};



export const notifications = (state = defaultNotifications, action) => {
  switch (action.type) {
    case NOTIFICATION_EDIT:
      let notification = {schedule: action.schedule, timestamp: action.timestamp}
      state = {...state,[action.schedule.id]: notification};
      break;

    case NOTIFICATION_WAS_DELETED:
      if(typeof state[action.scheduleId] !== 'undefined'){
        delete state[action.scheduleId];
      }
      break;
  }

  return state;
}

export const notificationIds = (state = [], action) => {

  switch (action.type) {
    case NOTIFICATION_EDIT:
      state = arrayPushUnique(action.schedule.id,state);
      break;
    case NOTIFICATION_WAS_DELETED:
      state = arrayRemove(action.scheduleId, state);
      break;
  }
  return state;
}