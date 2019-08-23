let url = '192.168.0.112:3000/last';
var Post = class Post {

    constructor(id, author, date, content, image) {
        this.id = id;
        this.author = author;
        this.date = date;
        this.content = content;
        this.image = image;
    }
};

function loopWhole(i,len, idp, list) {
    for (i ; i < len - 1; i++) {
        if (document.querySelector("#pagelet_group_mall").querySelector("div").querySelectorAll("._4-u2, .mbm, ._4mrt, ._5jmm, ._5pat, ._5v3q, ._7cqq, ._4-u8")[i].getAttribute('id') === idp) {
            return list;
        }
        var id = document.querySelector("#pagelet_group_mall").querySelector("div").querySelectorAll("._4-u2, .mbm, ._4mrt, ._5jmm, ._5pat, ._5v3q, ._7cqq, ._4-u8")[i].getAttribute('id');
        var author = document.querySelectorAll('.userContentWrapper')[i].querySelector(".fwn .fcg").textContent;
        var content = document.querySelectorAll('.userContentWrapper')[i].querySelector(".userContent").textContent;
        if (document.querySelectorAll('.userContentWrapper')[i].querySelector(".userContent").querySelector(".text_exposed_show") !== null) {
            content = content.replace('...', '');
            content = content.replace('Zobacz więcej', '');
        }
        var date = document.querySelectorAll('.userContentWrapper')[i].querySelector('abbr._5ptz').getAttribute('title');
        var image = [];
        if (document.querySelectorAll('.userContentWrapper')[i].querySelectorAll('._4-eo, ._2t9n').length === 1) {
            image = [document.querySelectorAll('.userContentWrapper')[i].querySelector('._4-eo, ._2t9n').querySelector('img').getAttribute('src')];
        } else if (document.querySelectorAll('.userContentWrapper')[i].querySelectorAll('._5dec').length > 1) {
            let lenOfImages = document.querySelectorAll('.userContentWrapper')[i].querySelectorAll('._5dec, ._xcx, ._487t').length;
            for (let j = 0; j < lenOfImages; j++) {
                image.push(document.querySelectorAll('.userContentWrapper')[i].querySelectorAll('._5dec, ._xcx, ._487t')[j].querySelector('img').getAttribute('src'));
            }
        }
        let post = new Post(id, author, date, content, image);
        list.push((post));
    }
    return list;
}
function loop(i,max, idp, list) {
    for (let i = 0; i < max-1; i++) {
        if (document.querySelector("#pagelet_group_mall").querySelector("div").querySelectorAll("._4-u2, .mbm, ._4mrt, ._5jmm, ._5pat, ._5v3q, ._7cqq, ._4-u8")[0].getAttribute('id') === idp) {
            return list;
        }
        var id = document.querySelector("#pagelet_group_mall").querySelector("div").querySelectorAll("._4-u2, .mbm, ._4mrt, ._5jmm, ._5pat, ._5v3q, ._7cqq, ._4-u8")[0].getAttribute('id');
        var author = document.querySelectorAll('.userContentWrapper')[0].querySelector(".fwn .fcg").textContent;
        var content = document.querySelectorAll('.userContentWrapper')[0].querySelector(".userContent").textContent;
        if (document.querySelectorAll('.userContentWrapper')[0].querySelector(".userContent").querySelector(".text_exposed_show") !== null) {
            content = content.replace('...', '');
            content = content.replace('Zobacz więcej', '');
        }
        var date = document.querySelectorAll('.userContentWrapper')[0].querySelector('abbr._5ptz').getAttribute('title');
        var image = [];
        if (document.querySelectorAll('.userContentWrapper')[0].querySelectorAll('._4-eo, ._2t9n').length === 1) {
            image = [document.querySelectorAll('.userContentWrapper')[0].querySelector('._4-eo, ._2t9n').querySelector('img').getAttribute('src')];
        } else if (document.querySelectorAll('.userContentWrapper')[0].querySelectorAll('._5dec').length > 1) {
            let lenOfImages = document.querySelectorAll('.userContentWrapper')[0].querySelectorAll('._5dec, ._xcx, ._487t').length;
            for (let j = 0; j < lenOfImages; j++) {
                image.push(document.querySelectorAll('.userContentWrapper')[0].querySelectorAll('._5dec, ._xcx, ._487t')[j].querySelector('img').getAttribute('src'));
            }
        }
        let post = new Post(id, author, date, content, image);

        list.push((post));
        document.querySelectorAll(".userContentWrapper")[0].remove();
    }
    console.log(list.length);
   i = max;
}
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
let i = 0;
let max = 13;
let list = [];
    function pageScroll() {
        window.scrollBy(0, 1000);
        if (document.getElementById('' + msg.text + '') !== null) {
            var leng = document.querySelectorAll(".userContentWrapper").length;
            var lis = loopWhole(i,leng, msg.text, list);
            console.log(leng);
            sendResponse([...new Set(lis)]);
            window.location.reload();
            window.scrollTo(0, 0);
            return 0;
        }else
        if (document.querySelector("#pagelet_group_pager").querySelector('._4-u2').querySelector('.groupsStreamMemeberBox') !== null) {
            var len = document.querySelectorAll(".userContentWrapper").length;
            console.log(len);
            var li = loopWhole(i,len, msg.text, list);
            sendResponse([...new Set(li)]);
            window.location.reload();
            window.scrollTo(0, 0);
            return 0;
        }else if(document.querySelectorAll(".userContentWrapper").length === max){
            loop(i, max, msg.text, list);
        }
        console.log(list.length);

        scrolldelay = setTimeout(pageScroll, 1);
    }

    if (msg.text !== 'report_back') {
        pageScroll();
        return true;
    }
});


