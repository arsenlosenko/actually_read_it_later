// Code of the 'Actually Read it Later' chrome extension (see manifest.json for further information
// Maintainer: Arsen Losenko
// Email: arsenlosenko@gmail.com

'use strict';

$('removeAlarm').click(function(){
    console.log(this);
});

function onContextClick(info, tab){
    console.log("tab " + JSON.stringify(tab));
    console.log("info " + info);
}

chrome.contextMenus.create({"title": "Actually read it later", "contexts": ["link"], "id": "123"});
chrome.contextMenus.onClicked.addListener(onContextClick);

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

function renderItems(){
   chrome.storage.sync.get('items', (item) => {
      $.each(item['items'], (index, item) => {
        console.log(index, item);
        appendEntry(index++, item);
      });
    });
} 

function updateItems(itemObj){
    chrome.storage.sync.get('items', (item) => {
        item['items'].push(itemObj);
        chrome.storage.sync.set(item);
    });
}

function init(){
    let firstItemKey = 1;
    let nextItemKey = firstItemKey + 1;
    let itemStorageKey = `item${firstItemKey}`;

    let itemTime = formatDateTimeValue();
    let minutes = getTimeDiff(itemTime); 

    let itemInfo = {};
    itemInfo.time = itemTime;

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs)=>{ 
        itemInfo.url = tabs[0].url;
        chrome.storage.sync.set(itemInfo); 
        chrome.alarms.create(itemStorageKey, {delayInMinutes: minutes});
    });

    renderItems();
} 

document.addEventListener('DOMContentLoaded', init);

