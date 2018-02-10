'use strict';
// TODO: remove alerts on close
// TODO: verify entered url
// TODO: open tab on notification button click
// TODO: add analytics

function formatNotificationMessage(url){
    // TODO: think about better messages
    let phrases = [
        `Here is your saved article:\n${url}\nHappy reading!`,
        `Another article delivered for you!\n${url}\nEnjoy!`,
        `Ring ring! Time to read!\n${url}`,
        `There you go, another fine article!\n${url}`
    ]
    let randIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randIndex] 
}

chrome.alarms.onAlarm.addListener(function(alarm) {
    let alarmUrl = alarm.name; 
    let alarmTime = 'time'+alarmUrl.slice(-1);

    chrome.storage.sync.get(alarmUrl,function(item){
         chrome.notifications.create({
             type:     'basic',
             iconUrl:  '../img/notebook256.png',
             title:    'Time to read!',
             message:   formatNotificationMessage(item[alarmUrl]),
             buttons: [
                 {title: 'Read Article'}
            ],
            priority: 2});
    });
    
    localStorage.removeItem(alarmUrl);
    localStorage.removeItem(alarmTime);
    });

chrome.notifications.onButtonClicked.addListener(function(buttonIndex) {
      chrome.storage.sync.get(function(items) {
            chrome.storage.sync.get('url', function(item){
                chrome.tabs.create({url: item.url});
        });
      });
});
