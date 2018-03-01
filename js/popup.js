// Code of the 'Actually Read it Later' chrome extension (see manifest.json for further information
// Maintainer: Arsen Losenko
// Email: arsenlosenko@gmail.com

'use strict';

$(document).on('click', '.removeAlarm', (e) => {
    let targetElem = e.target;
    let itemKey = targetElem.dataset.key;
    let itemName = "item"+itemKey;
    $("."+itemName).remove();
    removeItem(itemName);
});

function removeItem(itemName){
    chrome.storage.sync.get('items', (item) => {
        let allItems = item['items']; 
        let foundItem = allItems.find((item) => {return item.name === itemName;});
        let indexOfFoundItem = allItems.indexOf(foundItem);
        let removedItem = allItems.splice(indexOfFoundItem, 1);
        chrome.storage.sync.set({'items': allItems});
    });
}

function onContextClick(info, tab){
    addNewItem();
}

chrome.contextMenus.create({"title": "Actually read it later", "contexts": ["link"], "id": "aril"});
chrome.contextMenus.onClicked.addListener(onContextClick);


function renderItems(){
   chrome.storage.sync.get('items', (item) => {
      $.each(item['items'], (index, item) => {
        appendEntry(index + 1, item);
      });
    });
} 

function appendEntry(itemNum, item){
      let entryHTML = `
                    <li class="list-group-item item${itemNum}">
                        <div class="col-md-6 col-lg-12">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <input class="url form-control" type="text" placeholder="Enter URL here", value=${item.url}>
                                    <button class="btn btn-danger removeAlarm" data-key="${itemNum}"> 
                                        <i class="fa fa-times" data-key="${itemNum}"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
        `
    $('.list-group').append(entryHTML.toString());
} 


function addNewItem(){
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
}

function updateItems(itemObj){
    chrome.storage.sync.get('items', (item) => {
        item['items'].push(itemObj);
        chrome.storage.sync.set(item);
    });
}

function init(){
    addNewItem();
    renderItems();
} 

document.addEventListener('DOMContentLoaded', init);

