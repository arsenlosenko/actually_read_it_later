// Code of the 'Actually Read it Later' chrome extension (see manifest.json for further information
// Maintainer: Arsen Losenko
// Email: arsenlosenko@gmail.com

'use strict';

// google analytics setup 
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-92437551-1']);
_gaq.push(['_trackPageview']);

(function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
            
function trackButton(e) {
    _gaq.push(['_trackEvent', e.target.id, 'clicked']);
};

document.getElementById('shareLink').addEventListener('click', trackButton);
// end of google analytics setup


function formatDateTimeValue(){ 
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; 
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -8);
    return localISOTime ;
} 

function setCurrentURLAsDefValue(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs){ 
        document.querySelector('.url').value = tabs[0].url;
    });
}


function setDefaultTime(){
    document.querySelectorAll('.date').forEach(function(item){
        item.value = formatDateTimeValue();
    });
}

document.querySelectorAll('.saveUrl').forEach(function(item){
    item.addEventListener('click', function(){
        let siblings = this.parentNode.children;
        let newKey = parseInt(this.dataset.key) + 1;

        let params = {}
        params.key = this.dataset.key;
        params.url = siblings[0].value;
        params.time = siblings[1].value;
        
        getAlarmNotifications(params);
        addNewEntry(newKey);
    });
    item.addEventListener('click', trackButton);
});

function addNewEntry(newKey){
    document.querySelector('.item'+newKey.toString()).style.display = 'block';
    setDefaultTime();
} 


function getTimeDiff(time){
    let dateNow = new Date();
    let enteredDate = new Date(time);
    let diffMinutes = Math.ceil((enteredDate.getTime() - dateNow.getTime()) / 60000);
    return diffMinutes;
}

function setAlarm(url, minutes, key){
    let alarmName = 'url'+key;
    let urlObj = {};
    urlObj[alarmName] = url;

    chrome.storage.sync.set(urlObj , function(){return});
    chrome.alarms.create(alarmName, {delayInMinutes: minutes});
    // window.close();
}



function getAlarmNotifications(params){
    if(params.url && params.time){
            let key = params.key;
            let alarmUrl = 'url' + key;
            let alarmTime = 'time'+ key;
            let minutes = getTimeDiff(params.time);

            let itemInfo = {}
            itemInfo['item'+key] = {}
            itemInfo['item'+key].url = params.url;
            itemInfo['item'+key].time = params.time;
            chrome.storage.sync.set(itemInfo, function(){
                return
            }); 
            localStorage.setItem(alarmUrl, params.url);
            localStorage.setItem(alarmTime, params.time);
            setAlarm(params.url, minutes, key);

        }
} 

function init(){
    setCurrentURLAsDefValue();
    setDefaultTime();
    // chrome.storage.sync.get('item1', function(item){ 
    //     console.log(item);
    //     document.querySelector('.item1 .url').value = item[0].url;
    //     document.querySelector('.item1 .date').value = item[0].time; 
   //  });
} 

document.addEventListener('DOMContentLoaded', init);

