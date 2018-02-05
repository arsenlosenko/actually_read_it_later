'use strict';

function setAlarm(event) {
  let minutes = parseFloat(event.target.value);
  chrome.browserAction.setBadgeText({text: 'ON'});
  chrome.alarms.create({delayInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});

  let url  = document.getElementById('urlInput');
  chrome.storage.sync.set({url: url.value}, function(){
    console.log(chrome.storage.sync.get(function(items){
     console.log(items)
  }));
  }); 
  
  window.close();
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}

function setUrl(){
    let url  = document.getElementById('urlInput');
    chrome.alarms.create("testAlarm", {delayInMinutes: 0.1});
    console.log("Alarm is fired");
    chrome.storage.sync.set({'url': url.value}, function(){
        alert(url.value + 'is in storage'); 
    });
}


document.getElementById('sampleSecond').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
document.getElementById('urlBtn').addEventListener('click', setUrl);

