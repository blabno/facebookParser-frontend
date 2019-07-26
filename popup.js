
document.getElementById("sortAll").addEventListener("click", click);

var xhr = new XMLHttpRequest();
function click(e) {
        chrome.tabs.executeScript( null,

             {code:" document.querySelector(\"#pagelet_group_\").innerHTML"},
            (results) => {
                xhr.open("POST", "http://192.168.0.113:3000/", true);
                console.log(results);
                xhr.send(results);
            });
}
console.log();
