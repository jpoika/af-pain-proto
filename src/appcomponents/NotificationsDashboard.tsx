import * as React from "react";
import {List, ListItem} from 'material-ui/List';
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import {Formats} from '../lib/helpers'
export interface Props extends PageProps{
  notifications: {schedule: {id: number, title: string}, timestamp: number}[];
  deleteNotification: (notificationId: number) => any; 
}

export interface State{

}
export default class NotificationsDashboard extends React.Component<Props, State>{
  handleDateFormat = (epochMs) => {
    return Formats.msToDateTimeString(epochMs);
  }
  render(){

    const {appBarTitle,page,title,notifications,deleteNotification,replaceContent,restoreContent} = this.props

    return <BasicPage restoreContent={restoreContent} replaceContent={replaceContent}  appBarTitle={appBarTitle} page={page} title={title}>
              <List>
                {notifications.map(noti => {
                  return <ListItem key={noti.schedule.id} onTouchTap={() => deleteNotification(noti.schedule.id)} primaryText={noti.schedule.id + ': ' + noti.schedule.title + ', ' + this.handleDateFormat(noti.timestamp)}  />
                })}
              </List>   
            </BasicPage>;
  }
}
