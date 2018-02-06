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


function getTimeDiff(){
    let time  = document.getElementById('dateTime');
    let dateNow = new Date();
    let enteredDate = new Date(time.value);
    let diffMinutes = Math.ceil((enteredDate.getTime() - dateNow.getTime()) / 60000);
    return diffMinutes;
}

function setUrl(){
    // TODO: refactor to look better, and save url accordignly to alarm 
    let url  = document.getElementById('urlInput');
    let minutes = getTimeDiff();
    console.log(minutes);
    chrome.alarms.create("testAlarm", {delayInMinutes: 0.1});
    console.log("Alarm is fired");
    chrome.storage.sync.set({'url': url.value}, function(){
        alert(url.value + 'is in storage'); 
    });
    chrome.alarms.create({delayInMinutes: minutes});
}


document.getElementById('sampleSecond').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
document.getElementById('urlBtn').addEventListener('click', setUrl);

