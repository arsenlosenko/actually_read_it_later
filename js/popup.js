// Code of the 'Actually Read it Later' chrome extension (see manifest.json for further information
// Maintainer: Arsen Losenko
// Email: arsenlosenko@gmail.com

'use strict';

$(document).on('click', '.removeItem', (e) => {
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
                        <div class="col-md-12 col-lg-12">
                        <div class="panel panel-default item${itemNum}">
                            <div class="panel-body">
                                <img height=16 width=16 src="${item.favicon}" />
                                <a href="${item.url}" target='_blank'>${item.title}</a>
                                <i class="fa fa-times pull-right removeItem" title='Remove item' data-key="${itemNum}"></i>
                            </div>
                        </div>
                        </div>
        `
    $('.items').append(entryHTML.toString());
} 

function getPage(url){
    return $.ajax({
        'type': 'get',
        'url': url
        });
}



function addNewItem(){
    chrome.storage.sync.get('items',  (storageItems) => {
        let entries = storageItems.items;
        let itemInfo = {};
        let itemsLength = entries.length;
        let lastIndex = itemsLength - 1;
        itemInfo.name = "item" + (itemsLength + 1);

        chrome.tabs.getSelected((tab) => {
            itemInfo.url = tab.url;
            itemInfo.favicon = tab.favIconUrl;
            itemInfo.title = tab.title;
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

