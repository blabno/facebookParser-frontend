var urlRegex =new RegExp(/^https?:\/\/(?:[^./?#]+\.)?facebook\.com/);

function sendPosts(list) {

    for (let i = 0; i <list.length; i++) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://192.168.0.124:3000/", true);
        xhr.send(JSON.stringify(list[i]));
    }
}
function httpGet()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://192.168.0.124:3000/last', false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
chrome.browserAction.onClicked.addListener(function (tab) {

    if (urlRegex.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, {text: httpGet()}, sendPosts);
    }
    else (alert("bad url" + tab.url));
});