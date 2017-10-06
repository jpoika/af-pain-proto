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
    schedule(arg, cb: (err: any, result: any) => void): Promise<any>;
    clear(notificationId, cb: (err: any, result: any) => void): Promise<any>;
    clearAll(cb: (err: any, result: any) => void): Promise<any>;
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
        console.log(this);
    }

    onReady = (cb) => {
      this.onReadyCb = cb;
    }

    schedule = (arg: any) => {
        console.log(arg);
        return new Promise((accept, reject) => {
            this.notification.schedule(arg,(result) => {
                if(result !== 'OK'){
                    reject(result);
                }else{
                    accept(result);
                }
            });
        });
    }

    clear = (notificationId: number) => {
        return new Promise((accept, reject) => {
            this.notification.clear(notificationId,(result) => {
                if(result !== 'OK'){
                    reject(result);
                }else{
                    accept(result);
                }
            });
        });
    }

    clearAll = () => {
        return new Promise((accept, reject) => {
            this.notification.clearAll((result) => {
                if(result !== 'OK'){
                    reject(result);
                }else{
                    accept(result);
                }
            });
        });
    }

    on = (eventName:string,cb: (any) => void) => {
           this.notification.on(eventName,function(result){
               if(typeof result.data !== 'undefined'){
                   try {
                       result.data = JSON.parse(result.data);
                   } catch(e){
                       console.log(e);
                   }
               }
               cb(result);
           });
    }

    getNotificationObject = () => {
        return this.notification;
    }

}