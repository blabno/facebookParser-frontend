let url = '192.168.0.123:3000/last';
var Post = class Post {

    constructor(id, author, date, content, image) {
        this.id = id;
        this.author = author;
        this.date = date;
        this.content = content;
        this.image = image;
    }
};

function loop(len, idp) {
    var list = [];
    for (let i = 0; i < len - 1; i++) {
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

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    function pageScroll() {
        window.scrollBy(0, 1000);
        if (document.getElementById('' + msg.text + '') !== null) {


            var leng = document.querySelectorAll(".userContent").length;
            var lis = loop(leng, msg.text);
            sendResponse(lis);
            window.location.reload();
            window.scrollTo(0, 0);
            return 0;
        }
        if (document.querySelector("#pagelet_group_pager").querySelector('._4-u2').querySelector('.groupsStreamMemeberBox') !== null) {


            var len = document.querySelectorAll(".userContent").length;
            var li = loop(len, msg.text);
            sendResponse(li);
            window.location.reload();
            window.scrollTo(0, 0);
            return 0;
        }
        scrolldelay = setTimeout(pageScroll, 1);
    }

    if (msg.text !== 'report_back') {
        pageScroll();
        return true;
    }
});


