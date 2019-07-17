document.getElementById("sortAll").addEventListener("click", click);

var xhr = new XMLHttpRequest();
function click(e) {
    const c =
        chrome.tabs.executeScript( null,
            {code:" document.querySelectorAll(\".userContentWrapper\")[0].innerHTML"}, function(results){ xhr.open("POST", "http://192.168.0.112:3000/", true); xhr.send(results); } );

}
