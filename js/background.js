'use strict';
// TODO: save current state of app from click to click
// TODO: set default time in datetime-local to today
// TODO: change pictures
// TODO: refactor JS

chrome.alarms.onAlarm.addListener(function(alarm) {
    chrome.storage.sync.get('url', function(item){
        console.log(item);
        chrome.notifications.create({
            type:     'basic',
            iconUrl:  '../img/stay_hydrated.png',
            title:    'Time to Read',
            message:   item.url , 
            buttons: [
            {title: 'Read Article'},
           {title: 'Test button 2'}
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

