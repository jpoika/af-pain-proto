import NotificationsDashboard from '../appcomponents/NotificationsDashboard';
import {connect} from 'react-redux';
import { deleteNotification } from '../actions/notifications';


const stateToProps = (state, ownProps) => {
  return {
    title: 'Notifications',
    page: {title: "Notifications", subtitle: 'Pain Proto', content: ''},
    notifications: state.notificationIds.map(nid => state.notifications[nid])
  }
}
const dispatchToProps = (dispatch) => {
  return {
    deleteNotification: (id) => {
      console.log('delete noti clicked');
      dispatch(deleteNotification(id));
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(NotificationsDashboard);