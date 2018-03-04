// Code of the 'Actually Read it Later' chrome extension (see manifest.json for further information
// Maintainer: Arsen Losenko
// Email: arsenlosenko@gmail.com

'use strict';

$(document).on('click', '.removeItem', (e) => {
    removeItem(e.target.dataset.key);
});

function removeItem(itemName){
    $("."+itemName).remove();
    chrome.storage.sync.remove(itemName);
}

function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
}

function onContextClick(info, tab){
    addNewItem();
}

chrome.contextMenus.create({"title": "Actually read it later", "contexts": ["link"], "id": "aril"});
chrome.contextMenus.onClicked.addListener(onContextClick);


function renderItems(){
    chrome.storage.sync.get((items) => {
        $.each(items, (index, item) => {
            if(index != 'defaultTime'){
                appendEntry(index, item);
            }
        });
    });
} 

function appendEntry(itemKey, item){
      let entryHTML = `
            <div class="col-md-12 col-lg-12">
            <div class="panel panel-default ${itemKey}">
                <div class="panel-body">
                    <img height=16 width=16 src="${item.favicon}" />
                    <a href="${item.url}" target='_blank'>${item.title}</a>
                    <i class="fa fa-times pull-right removeItem" title='Remove item' data-key="${itemKey}"></i>
                </div>
            </div>
            </div>
        `
    $('.items').append(entryHTML.toString());
} 

function addNewItem(){
    chrome.tabs.getSelected((tab) => {
        if(!tab.url.startsWith('chrome')){ 
            let itemName = `item${getRandomInt(100)}`;
            let itemInfo = {};

            itemInfo[itemName] = {}; 
            itemInfo[itemName].url = tab.url;
            itemInfo[itemName].favicon = tab.favIconUrl;
            itemInfo[itemName].title = tab.title;

            chrome.storage.sync.set(itemInfo);
        }
    });
}


function init(){
    addNewItem();
    renderItems();
} 

document.addEventListener('DOMContentLoaded', init);

