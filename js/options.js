$('.setDefaultTime').click(() => {
    console.log($('#time').val());
    let defaultTime = $("#time").val();
    if (defaultTime){
        chrome.storage.sync.set({'defaultTime': defaultTime});
    }
});

function init(){
    chrome.storage.sync.get('defaultTime', (item) => {
        $('#time').val(item.defaultTime);
    });
}


document.addEventListener('DOMContentLoaded', init);
