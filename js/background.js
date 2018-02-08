'use strict';
// TODO: save current state of app from click to click
// TODO: set default time in datetime-local to today
// TODO: add analytics

chrome.alarms.onAlarm.addListener(function(alarm) {
    let urlKey = alarm.name + 'url';

    chrome.storage.sync.get(urlKey,function(item){
         chrome.notifications.create({
             type:     'basic',
             iconUrl:  '../img/notebook256.png',
             title:    'Time to Read',
             message:   item[urlKey] , 
             buttons: [
                 {title: 'Read Article'}
            ],
            priority: 0});
    });
    });

chrome.notifications.onButtonClicked.addListener(function(buttonIndex) {
    console.log(buttonIndex);
  chrome.storage.sync.get(function(items) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.storage.sync.get('url', function(item){
        chrome.tabs.create({url: item.url});
    });
  });
});
