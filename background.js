const urlRegex = new RegExp(/^https?:\/\/(?:[^./?#]+\.)?facebook\.com/);
let pathVariable = '' ;
function sendPosts(list) {
  for (let i = 0; i < list.length; i++) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://192.168.0.124:3000/"+pathVariable, true);
    xhr.send(JSON.stringify(list[i]));
  }
}

function httpGet() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", 'http://192.168.0.124:3000/last/'+pathVariable, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        let url = tabs[0].url.substring(7);
        let urlParts = url.split('/');
        pathVariable = urlParts[3];
    });
  if (urlRegex.test(tab.url)) {
    chrome.tabs.sendMessage(tab.id, {text: httpGet()}, sendPosts);
  } else {
    alert("bad url" + tab.url);
  }
});