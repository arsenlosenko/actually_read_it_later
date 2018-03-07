// Code of the 'Actually Read it Later' chrome extension (see manifest.json for further information
// Maintainer: Arsen Losenko
// Email: arsenlosenko@gmail.com

'use strict';

chrome.alarms.onAlarm.addListener((alarm) =>  {
    chrome.tabs.create({url: '/popup.html'});
    setAlarmForTheNextDay();
});

function setAlarmForTheNextDay(){
    let minutesInADay = 1440;
    chrome.alarms.create('readingTimeAlarm', {delayInMinutes: minutesInADay});
}

function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
}

chrome.contextMenus.create({"title": "Add to queue", "contexts": ["link"], "id": `${getRandomInt(1000)}`});

chrome.runtime.onInstalled.addListener((details) => {
    if(details.reason == "install"){
        chrome.runtime.openOptionsPage(() =>{return});
    }
});
