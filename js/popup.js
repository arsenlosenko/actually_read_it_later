'use strict';

document.querySelectorAll('.urlBtn').forEach(function(item){
    item.addEventListener('click', function(){
        let key = this.dataset.key;
        getAlarmNotifications(key);
    });
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
            document.querySelector('.alert-danger').style.display = 'block'; 
            document.querySelector('.alert-success').style.display = 'none'; 
        }
        else{
            let minutes = getTimeDiff(readingTime);
            localStorage.setItem(alarmUrl, articleUrl);
            localStorage.setItem(alarmTime, readingTime);
            setAlarm(articleUrl, minutes, key);

            document.querySelector('.alert-danger').style.display = 'none'; 
            document.querySelector('.alert-success').style.display = 'block'; 
        }
} 


            
