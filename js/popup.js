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


function formatDataAndAddEntry(){
    // TODO: simplify this funciton
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

            appendEntry(nextItemKey);
        }
}
function formatDateTimeValue(){ 
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; 
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -8);
    return localISOTime 
} 

function setCurrentURLForEmptyInput(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs){ 
        document.querySelector('.url').value = tabs[0].url;
    });
}


function getTimeDiff(time){
    let dateNow = new Date();
    let enteredDate = new Date(time);
    let diffMinutes = Math.ceil((enteredDate.getTime() - dateNow.getTime()) / 60000);
    return diffMinutes;
}

function appendEntry(itemNum, item=""){
     if(item === ""){ 
        item = {};
        item.url = "";
        item.time = formatDateTimeValue();
     }
      let entryHTML = `
                    <li class="list-group-item item${itemNum}">
                        <div class="col-md-6">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <input class="url form-control" type="text" placeholder="Enter URL here", value=${item.url}>
                                    <input class="date form-control" type="datetime-local" value=${item.time} >
                                    <button class="btn btn-success setAlarm" data-key="${itemNum}">+</button>
                                </div>
                            </div>
                        </div>
                    </li>
        `
    $('.list-group').append(entryHTML.toString());
    $('.setAlarm').click(formatDataAndAddEntry);
    $('.setAlarm').click(trackButton);
} 

function init(){
   let itemNames = ['item1','item2','item3','item4','item5'];
   chrome.storage.sync.get(itemNames, function(items){
      $.each(items, function(index, item){
        appendEntry(index.slice(-1), item);
      });
    });

    setCurrentURLForEmptyInput();
    $('.date').val(formatDateTimeValue());
    $('.setAlarm').click(formatDataAndAddEntry);
    $('.setAlarm').click(trackButton);

} 

document.addEventListener('DOMContentLoaded', init);

