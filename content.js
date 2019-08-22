let url = '192.168.0.107:3000/last';
var Post = class Post {

    constructor(id, author, date, content, image) {
        this.id = id;
        this.author = author;
        this.date = date;
        this.content = content;
        this.image = image;
    }
};

function getData(idp, list) {

    let len = document.querySelectorAll(".userContentWrapper").length;

    for (let i = 0; i < len; i++) {
        let main = document.querySelector("._5pcb");
        let postContent = document.querySelector('.userContentWrapper');
        if (main.querySelector('._4mrt').getAttribute('id') === idp) {
            return list;
        }
        let id = main.querySelector('._4mrt').getAttribute('id');
        let author = postContent.querySelector('.fwn .fcg').textContent;
        let content = postContent.querySelector('.userContent').textContent;
        if (postContent.querySelector('.userContent').querySelector('.text_exposed_show') !== null) {
            content = content.replace('...', '');
            content = content.replace('Zobacz więcej', '');
        }
        let date = postContent.querySelector('._5ptz').getAttribute('title');
        let image = [];
        if (postContent.querySelectorAll('._4-eo').length === 1) {
            image = [postContent.querySelector('._4-eo').querySelector('img').getAttribute('src')];
        } else if (postContent.querySelectorAll('._5dec').length > 1) {
            let lenOfImages = postContent.querySelectorAll('._5dec').length;
            let images = postContent.querySelectorAll('._5dec');
            for (let j = 0; j < lenOfImages; j++) {
                image.push(images[j].querySelector('img').getAttribute('src'));
            }
        }
        let post = new Post(id, author, date, content, image);
        list.push((post));
        postContent.parentElement.parentElement.remove();
    }
    window.scrollBy(0, 1);
    window.scrollTo(0, 0);
    return list;
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    let list = [];

    function init() {
        if (document.getElementById('' + msg.text + '') !== null || document.querySelector("#pagelet_group_pager").querySelector('._4-u2').querySelector('.groupsStreamMemeberBox') !== null) {
            var lis = getData(msg.text, list);
            sendResponse([...new Set(lis)]);
            window.location.reload();
            return 0;
        } else if (document.querySelectorAll(".userContentWrapper").length <= 13) {
            getData(msg.text, list);
        }
        setTimeout(init, 1);
    }

    if (msg.text !== 'report_back') {
        init();
        return true;
    }
});
