// Code of the 'Actually Read it Later' chrome extension (see manifest.json for further information
// Maintainer: Arsen Losenko
// Email: arsenlosenko@gmail.com

'use strict';

let alarmUrl = "";
let alarmTime = "";

function formatNotificationMessage(url){
    let phrases = [
        `Here is your saved article:\n\n${url}\n\nHappy reading!`,
        `Another article delivered for you!\n\n${url}\n\nEnjoy!`,
        `Ring ring! Time to read!\n\n${url}`,
        `There you go, another fine article!\n\n${url}`
    ]
    let randIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randIndex] 
}

chrome.alarms.onAlarm.addListener(function(alarm) {
    alarmUrl = alarm.name; 
    alarmTime = 'time'+alarmUrl.slice(-1);

    chrome.storage.sync.get(alarmUrl,function(item){
         chrome.notifications.create({
             type:     'basic',
             iconUrl:  '../img/notebook256.png',
             title:    'Time to read!',
             message:   formatNotificationMessage(item[alarmUrl]),
             buttons: [
                 {title: 'Read Now'},
            ],
            priority: 2});
    });
    
    localStorage.removeItem(alarmUrl);
    localStorage.removeItem(alarmTime);
    });

chrome.notifications.onButtonClicked.addListener(function(notificationID, buttonIndex) {
      chrome.storage.sync.get(function(items) {
            chrome.storage.sync.get(alarmUrl, function(item){
                chrome.tabs.create({url: item[alarmUrl]});
        });
      });
});
