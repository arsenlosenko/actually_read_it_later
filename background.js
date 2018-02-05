'use strict';


chrome.alarms.onAlarm.addListener(function(alarm) {
    let url = '';
    chrome.storage.sync.get('url', function(item){
       url = item.url;
   chrome.notifications.create({
       type:     'basic',
       iconUrl:  'stay_hydrated.png',
       title:    'Time to Hydrate',
       message:   url, 
     buttons: [
       {title: 'Keep it Flowing.'},
       {title: 'Test button 2'}
       ],
       priority: 0});
    });
});

chrome.notifications.onButtonClicked.addListener(function() {
  chrome.storage.sync.get(function(items) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.alarms.create({delayInMinutes: items[0].minutes});
  });
});

