let url = 'http://192.168.0.123:3000/last';

var urlRegex =new RegExp(/^https?:\/\/(?:[^./?#]+\.)?facebook\.com/);

function httpGet()
{
    fetch(url)
    .then(
        response => response.text() // .json(), etc.
        // same as function(response) {return response.text();}
    )
}
var a = httpGet();
alert(httpGet())
window.localStorage.setItem('id', httpGet());
window.id = httpGet();


function sendPosts(list) {

    for (let i = 0; i <list.length; i++) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://192.168.0.123:3000/", true);
        xhr.send(JSON.stringify(list[i]));
    }
}
chrome.browserAction.onClicked.addListener(function (tab) {

    if (urlRegex.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, {text: httpGet()}, sendPosts);
    }
    else (alert("bad url" + tab.url));
});
