'use strict';


function getTimeDiff(time){
    let dateNow = new Date();
    let enteredDate = new Date(time);
    let diffMinutes = Math.ceil((enteredDate.getTime() - dateNow.getTime()) / 60000);
    return diffMinutes;
}

function setAlarm(url, minutes, key){
    let alarmName = 'alarm'+key;
    let urlKey = alarmName + 'url'; 
    let obj = {};
    obj[urlKey] = url;

    chrome.storage.sync.set(obj , function(){
        console.log(obj);
    });
    chrome.alarms.create(alarmName, {delayInMinutes: minutes});
}


document.querySelectorAll('.urlBtn').forEach(function(item){
    item.addEventListener('click', function(){
        let key = this.dataset.key;
        let urlKey = 'url' + key;
        let readingTime = document.querySelector('.dateTime'+ key).value;
        let articleUrl = document.querySelector('.urlInput' + key).value;
        let minutes = getTimeDiff(readingTime);
        localStorage.setItem(urlKey, articleUrl);
        document.querySelector('.alert').style.display = 'block'; 
        setAlarm(articleUrl, minutes, key);
    });
});

document.querySelectorAll('.url').forEach(function(item){
    console.log(item.value, item.dataset.key);
    let urlKey = 'url' + item.dataset.key;
    item.value = localStorage.getItem(urlKey);
});

document.querySelectorAll('.date').forEach(function(item){
    console.log(item.value, item.dataset.key);
});
