function setAlarm(){
    chrome.storage.sync.get('defaultTime', function(item){
        let defaultTimeDate = convertDefaultTimeToDatetime(item['defaultTime']);
        let minutes = getTimeDiff(defaultTimeDate);
        chrome.alarms.create('readingTimeAlarm', {delayInMinutes: minutes});
    });
}

function getTimeDiff(defaultTimeDate){
    let dateNow = new Date();
    let diffMinutes = Math.ceil((defaultTimeDate.getTime() - dateNow.getTime()) / 60000);
    return diffMinutes;
}

function convertDefaultTimeToDatetime(time){
    let hours = time.slice(0,2);
    let minutes = time.slice(3,6);
    let baseDate = new Date();
    baseDate.setHours(hours);
    baseDate.setMinutes(minutes);
    return baseDate;
}

$('.setDefaultTime').click(() => {
    let defaultTime = $("#time").val();
    if (defaultTime){
        chrome.storage.sync.set({'defaultTime': defaultTime});
        setAlarm();
        if(window.innerWidth > 500){
            closeTab();
        }
    }
    
});

function closeTab(){
    chrome.tabs.getSelected((tab) => { 
        chrome.tabs.remove(tab.id);
    });
}

function init(){
    chrome.storage.sync.get('defaultTime', (item) => {
        $('#time').val(item.defaultTime);
    });
}


document.addEventListener('DOMContentLoaded', init);
