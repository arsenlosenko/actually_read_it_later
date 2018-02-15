// Code of the 'Actually Read it Later' chrome extension (see manifest.json for further information
// Maintainer: Arsen Losenko
// Email: arsenlosenko@gmail.com

'use strict';

let alarmName = "";

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
    alarmName = alarm.name; 

    chrome.storage.sync.get(alarmName,function(item){
         chrome.notifications.create({
             type:     'basic',
             iconUrl:  '../img/notebook256.png',
             title:    'Time to read!',
             message:   formatNotificationMessage(item[alarmName].url),
             buttons: [
                 {title: 'Read Now'},
            ],
            priority: 2});
    });
    
    });

chrome.notifications.onButtonClicked.addListener(function(notificationID, buttonIndex) {
    chrome.storage.sync.get(alarmName, function(item){
        chrome.tabs.create({url: item[alarmName].url});
  });
     chrome.storage.sync.clear(function(){return});
});
