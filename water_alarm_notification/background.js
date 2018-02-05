'use strict';

chrome.alarms.onAlarm.addListener(function() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  'stay_hydrated.png',
      title:    'Time to Hydrate',
      message:  'Everyday I\'m Guzzlin\'!\n', 
      buttons: [
        {title: 'Keep it Flowing.'}
      ],
      priority: 0});
});

chrome.notifications.onButtonClicked.addListener(function() {
  chrome.storage.sync.get(function(items) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.alarms.create({delayInMinutes: items[0].minutes, url: items[1]});
  });
});
