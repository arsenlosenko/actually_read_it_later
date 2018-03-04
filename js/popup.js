// Code of the 'Actually Read it Later' chrome extension (see manifest.json for further information
// Maintainer: Arsen Losenko
// Email: arsenlosenko@gmail.com

'use strict';

chrome.contextMenus.onClicked.addListener(onContextClick);

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
    addNewItem(info.linkUrl);
    chrome.notifications.create({
      type:     'basic',
      iconUrl:  '../img/notebook256.png',
      title:     'Saved!',
      message:   'Your article added to reading queue!',
      priority: 1
    });
}



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
    $('.items').append(entryHTML);
} 

function addItemFromCurrentTabData(){
    chrome.tabs.getSelected((tab) => {
        if(!tab.url.startsWith('chrome')){ 
            let itemName = `item${getRandomInt(100)}`;
            let itemInfo = {};

            itemInfo[itemName] = {}; 
            itemInfo[itemName].url = tab.url;
            itemInfo[itemName].favicon = tab.favIconUrl;
            itemInfo[itemName].title = tab.title;

            chrome.storage.sync.set(itemInfo);
            renderItems();
        }else{ 
            renderItems();
        }
    });
}

function getPage(url){ 
    return $.ajax({
        'type': 'get',
        'url': url
    });
}

function getHostName(url) {
    let match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
    }
    else {
        return null;
    }
}

function addItemFromUrl(url){ 
    let itemName = `item${getRandomInt(100)}`;
    let faviconUrl = 'http://www.google.com/s2/favicons?domain='; 
    let hostname = getHostName(url);

    getPage(url).done((res) => {
            let itemInfo = {};
            itemInfo[itemName] = {}; 
            itemInfo[itemName].url = url;
            itemInfo[itemName].favicon = faviconUrl + hostname;
            itemInfo[itemName].title = $(res).filter('title').text(); 
            console.log(itemInfo);

            chrome.storage.sync.set(itemInfo);
    });
}

function addNewItem(url=" "){
    if(url === " "){ 
        addItemFromCurrentTabData();
    }else{ 
        addItemFromUrl(url); 
    }
}

addNewItem();

