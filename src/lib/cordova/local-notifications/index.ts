/*
cordova.plugins.notification.local.schedule({
    id: 1,
    title: "Take Re-Assessment",
    text: "Duration 5m",
    firstAt: monday_9_am,
    every: "week",
    sound: "file://sounds/reminder.mp3",
    icon: "http://icons.com/?cal_id=1",
    data: { action:"take_assessment", type: 'reassessment' }
});

cordova.plugins.notification.local.on("click", function (notification) {
    //joinMeeting(notification.data.meetingId);
    switch(notification.data.action){
      case 'take_assessment':
          //trigger redux actions here
        break; 
    }
});
*/

export interface LocalNotificationInterface {
    on:  (eventName: string,cb: (any)) => any;
    data: any;
    schedule: any; //TODO
}

export default class LocalNotification{
    public notification:LocalNotificationInterface;
    public isReady:boolean = false;
    public initCb: () => LocalNotificationInterface  //use generic for return value?
    public onReadyCb: () => void = () => {};
    
    constructor(initCb: () => LocalNotificationInterface){
        this.initCb = initCb;
    }

    init = () => {
        this.notification = this.initCb();
        this.isReady = true;
        this.onReadyCb.call(this);
    }

    onReady = (cb) => {
      this.onReadyCb = cb;
    }

    schedule = (arg: any) => {
        this.notification.schedule(arg);
    }

    on = (eventName:string,cb: (any) => void) => {
           this.notification.on(eventName,cb);
    }

    getNotificationObject = () => {
        return this.notification;
    }

}