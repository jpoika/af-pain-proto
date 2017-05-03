const monday_9_am = '?????'
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