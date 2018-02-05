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
    let time  = document.getElementById('dateTime');
    console.log(url.value, new Date(time.value));
}


document.getElementById('sampleSecond').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
document.getElementById('urlBtn').addEventListener('click', setUrl);

//document.addEventListener("DOMContentLoaded", function(event) {
 //       console.log(new Date());
  //      document.getElementById('dateTime').value = new Date();
//});
