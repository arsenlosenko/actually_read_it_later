'use strict';
// TODO: remove alerts on close
// TODO: format notification
// TODO: open tab on notification button click
// TODO: add analytics

chrome.alarms.onAlarm.addListener(function(alarm) {
    let urlKey = alarm.name; 
    let timeKey = 'time'+urlKey.slice(-1);

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
    
    localStorage.removeItem(urlKey);
    localStorage.removeItem(timeKey);
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
