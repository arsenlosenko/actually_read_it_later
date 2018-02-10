'use strict';


function getTimeDiff(time){
    let dateNow = new Date();
    let enteredDate = new Date(time);
    let diffMinutes = Math.ceil((enteredDate.getTime() - dateNow.getTime()) / 60000);
    return diffMinutes;
}

function setAlarm(url, minutes, key){
    let alarmName = 'url'+key;
    let obj = {};
    obj[alarmName] = url;

    chrome.storage.sync.set(obj , function(){
        console.log(obj);
    });
    chrome.alarms.create(alarmName, {delayInMinutes: minutes});
}


function formatDateTimeValue(){ 
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; 
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -8);
    return localISOTime ;
} 

document.querySelectorAll('.urlBtn').forEach(function(item){
    item.addEventListener('click', function(){
        let key = this.dataset.key;
        let urlKey = 'url' + key;
        let timeKey = 'time'+key;
        let readingTime = document.querySelector('.dateTime'+ key).value;
        let articleUrl = document.querySelector('.urlInput' + key).value;

        if (readingTime === "" || articleUrl === ""){
            document.querySelector('.alert-warning').style.display = 'block'; 
            document.querySelector('.alert-success').style.display = 'none'; 
        }
        else{
            let minutes = getTimeDiff(readingTime);
            localStorage.setItem(urlKey, articleUrl);
            localStorage.setItem(timeKey, readingTime);
            setAlarm(articleUrl, minutes, key);

            document.querySelector('.alert-warning').style.display = 'none'; 
            document.querySelector('.alert-success').style.display = 'block'; 
        }
    });
});

document.querySelectorAll('.url').forEach(function(item){
    let urlKey = 'url' + item.dataset.key;
    item.value = localStorage.getItem(urlKey);
});

document.querySelectorAll('.close').forEach(function(item){
        document.querySelector('.alert-warning').style.display = 'none'; 
        document.querySelector('.alert-success').style.display = 'none'; 
});


document.querySelectorAll('.date').forEach(function(item){
    let timeKey = 'time' + item.dataset.key;
     if (localStorage.getItem(timeKey)){
        console.log(localStorage.getItem(timeKey));
        item.value = localStorage.getItem(timeKey);
    }else{
        item.value = formatDateTimeValue();
    } 
}
);


            
