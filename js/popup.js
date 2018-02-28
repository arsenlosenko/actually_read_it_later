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

function appendEntry(itemNum, item){
      let entryHTML = `
                    <li class="list-group-item item${itemNum}">
                        <div class="col-md-6 col-lg-12">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <input class="url form-control" type="text" placeholder="Enter URL here", value=${item.url}>
                                    <input class="date form-control" type="time" value=${item.time} >
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
    renderItems();
    chrome.storage.sync.get(['items', 'defaultTime'],  (storageItems) => {
        let entries = storageItems.items;
        let defaultTime = storageItems.defaultTime;
        let itemInfo = {};
        let itemsLength = entries.length;
        let lastIndex = itemsLength - 1;
        itemInfo.name = "item" + (itemsLength + 1);
        itemInfo.time = defaultTime;

        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs)=>{ 
            itemInfo.url = tabs[0].url;
            updateItems(itemInfo);
        });
    });

    // chrome.alarms.create(itemStorageKey, {delayInMinutes: minutes});
} 

document.addEventListener('DOMContentLoaded', init);

