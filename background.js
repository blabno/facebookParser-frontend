var urlRegex =new RegExp(/^https?:\/\/(?:[^./?#]+\.)?facebook\.com/);

function sendPosts(list) {

    for (let i = 0; i <list.length; i++) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://192.168.0.112:3000/", true);
        xhr.send(JSON.stringify(list[i]));
    }
}
function httpGet()
{
    // var andrzej =true
    // chrome.tabs.onUpdated.addListener(function (tabId,info){
    //     if(info.status==='complete'){
    //         chrome.tabs.sendMessage(tab.id, {text: httpGet()}, sendPosts);
    //
    //     }
    //
    // })
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://192.168.0.112:3000/last', false );
    xmlHttp.send( null );
    //andrzej =false
    return xmlHttp.responseText;
}
chrome.browserAction.onClicked.addListener(function (tab) {
    var dataSaved = false;
    if (urlRegex.test(tab.url)) {


            chrome.tabs.onUpdated.addListener(function (tabId,info){
                if(!dataSaved){
                    if(info.status==='complete'){
                        chrome.tabs.sendMessage(tab.id, {text: httpGet()}, sendPosts);
                        dataSaved=true
                    }

                }


            })


        chrome.tabs.executeScript({
            code:'window.location.href += "/?sorting_setting=CHRONOLOGICAL";\n'
        })
    }
    else (alert("bad url" + tab.url));
});
