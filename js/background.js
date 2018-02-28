// Code of the 'Actually Read it Later' chrome extension (see manifest.json for further information
// Maintainer: Arsen Losenko
// Email: arsenlosenko@gmail.com

'use strict';

chrome.alarms.onAlarm.addListener((alarm) =>  {
    chrome.tabs.create({url: '/popup.html'});
});

chrome.runtime.onInstalled.addListener((details) => {
    if(details.reason == "install"){
        chrome.runtime.openOptionsPage(() =>{return});
        chrome.storage.sync.set({'items':[]});
    }
});
