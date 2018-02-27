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
    return localISOTime 
} 


function getTimeDiff(time){
    let dateNow = new Date();
    let enteredDate = new Date(time);
    let diffMinutes = Math.ceil((enteredDate.getTime() - dateNow.getTime()) / 60000);
    return diffMinutes;
}

function appendEntry(itemNum, item){
      let entryHTML = `
                    <li class="list-group-item item${itemNum}">
                        <div class="col-md-6 col-lg-12">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <input class="url form-control" type="text" placeholder="Enter URL here", value=${item.url}>
                                    <input class="date form-control" type="datetime-local" value=${item.time} >
                                    <button class="btn btn-danger removeAlarm" data-key="${itemNum}"> 
                                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
        `
    $('.list-group').append(entryHTML.toString());
} 

$('.removeAlarm').click(function(){
    chrome.storage.sync.remove("item"+this.dataset.key, function(){
        $(this).remove("li.item"+this.dataset.key);
    });
});

function init(){
        let firstItemKey = 1;
        let nextItemKey = firstItemKey + 1;
        let itemStorageKey = `item${firstItemKey}`;

        let itemTime = formatDateTimeValue();
        let minutes = getTimeDiff(itemTime); 

        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs){ 
            let itemUrl = tabs[0].url;
            let itemInfo = {};
            itemInfo[itemStorageKey] = {};

            itemInfo[itemStorageKey].url = itemUrl;
            itemInfo[itemStorageKey].time = itemTime 

            chrome.storage.sync.set(itemInfo, function(){
                chrome.alarms.create(itemStorageKey, {delayInMinutes: minutes});
            }); 
        });
        
       chrome.storage.sync.get(function(items){
          $.each(items, function(index, item){
            appendEntry(index.slice(-1), item);
          });
        });


} 

document.addEventListener('DOMContentLoaded', init);


function onContextClick(info, tab){
    console.log("tab " + JSON.stringify(tab));
    console.log("info " + info);
}

chrome.contextMenus.create({"title": "Actually read it later", "contexts": ["link"], "id": "123"});
chrome.contextMenus.onClicked.addListener(onContextClick);
