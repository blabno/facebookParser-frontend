var urlRegex =new RegExp(/^https?:\/\/(?:[^./?#]+\.)?facebook\.com/);

function doStuffWithDom(list) {

    for (let i = 0; i < list.length; i++) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://192.168.0.121:3000/", true);
        xhr.send(list[i]);
        setTimeout(function () {


        }, 500);
    }

}

chrome.browserAction.onClicked.addListener(function (tab) {

    if (urlRegex.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
    }
    else (alert("bad url" + tab.url));
});