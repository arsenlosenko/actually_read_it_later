// Code of the 'Actually Read it Later' chrome extension (see manifest.json for further information
// Maintainer: Arsen Losenko
// Email: arsenlosenko@gmail.com

'use strict';
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

document.querySelectorAll('.saveUrl').forEach(function(item){
    item.addEventListener('click', function(){
        let key = this.dataset.key;
        getAlarmNotifications(key);
    });
    item.addEventListener('click', trackButton);
});

document.querySelectorAll('.url').forEach(function(item){
    let alarmUrl = 'url' + item.dataset.key;
    item.value = localStorage.getItem(alarmUrl);
});


document.querySelectorAll('.date').forEach(function(item){
    let  alarmTime = 'time' + item.dataset.key;
    if (localStorage.getItem(alarmTime)){
        item.value = localStorage.getItem(alarmTime);
    }else{
        item.value = formatDateTimeValue();
    } 
});


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
    window.close();
}


function formatDateTimeValue(){ 
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; 
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -8);
    return localISOTime ;
} 

function getAlarmNotifications(key){
        let alarmUrl = 'url' + key;
        let alarmTime = 'time'+ key;

        let readingTime = document.querySelector('.dateTime'+ key).value;
        let articleUrl = document.querySelector('.urlInput' + key).value;

        if (readingTime === "" || articleUrl === ""){
            alert('URL field is empty, please add your URL and try again.');
        }
        else{
            let minutes = getTimeDiff(readingTime);
            localStorage.setItem(alarmUrl, articleUrl);
            localStorage.setItem(alarmTime, readingTime);
            setAlarm(articleUrl, minutes, key);

        }
} 

