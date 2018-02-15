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

$('.setAlarm').click(function(){
        let currentItemKey = this.dataset.key
        let nextItemKey = +currentItemKey + 1;
        let itemStorageKey = `item${currentItemKey}`

        let siblings = this.parentNode.children;
        let itemUrl = siblings[0].value;
        let itemTime = siblings[1].value;
        let minutes = getTimeDiff(itemTime); 

        let itemInfo = {};
        itemInfo[itemStorageKey] = {};

        if (itemUrl && itemTime){
            itemInfo[itemStorageKey].url = itemUrl;
            itemInfo[itemStorageKey].time = itemTime 

            chrome.storage.sync.set(itemInfo, function(){
                chrome.alarms.create(itemStorageKey, {delayInMinutes: minutes});
            }); 

            addNewEntryAfterSave(nextItemKey);
        }
});

$('.setAlarm').click(trackButton);

function formatDateTimeValue(){ 
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; 
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -8);
    return localISOTime 
} 

function setCurrentURLAsDefaultValue(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs){ 
        document.querySelector('.url').value = tabs[0].url;
    });
}

function addNewEntryAfterSave(newKey){
    let itemSelector = `.item${newKey}`;
    document.querySelector(itemSelector).style.display = 'block';
    setDefaultTime(itemSelector);
} 

function setDefaultTime(itemSelector='.item1'){
    document.querySelector(`${itemSelector} .date`).value = formatDateTimeValue();
}


function getTimeDiff(time){
    let dateNow = new Date();
    let enteredDate = new Date(time);
    let diffMinutes = Math.ceil((enteredDate.getTime() - dateNow.getTime()) / 60000);
    return diffMinutes;
}


function init(){
       setCurrentURLAsDefaultValue();
       setDefaultTime();
} 

document.addEventListener('DOMContentLoaded', init);

