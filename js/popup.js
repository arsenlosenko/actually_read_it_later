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
                                <img height=16 width=16 class='favicon'/>
                                <a href="${item.url}" target='_blank'>${item.url}</a>
                                <i class="fa fa-times pull-right removeItem" title='Remove item' data-key="${itemNum}"></i>
                            </div>
                        </div>
                        </div>
        `
    $('.items').append(entryHTML.toString());

    getPage(item.url).done((res) => {
        let title = $(res).filter('title').text();
        let faviconURL = 'http://www.google.com/s2/favicons?domain=';
        let itemAnchor = $('.item'+itemNum+' a');
        itemAnchor.text(title);
        $('.item'+itemNum+' .favicon').attr('src', faviconURL + itemAnchor[0].hostname);
        
    });

} 

function getPage(url){
    return $.ajax({
        'type': 'get',
        'url': url
        });
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
            if (!tabs[0].url.startsWith('chrome')){
                itemInfo.url = tabs[0].url;
                updateItems(itemInfo);
            }
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

