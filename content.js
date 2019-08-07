
var Post = class Post {

    constructor(id, author, date, content, image) {
        this.id = id;
        this.author = author;
        this.date = date;
        this.content = content;
        this.image = image;
    }
};


chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    function pageScroll() {
        
        window.scrollBy(0, 1000); 
        
        if (document.querySelector("#pagelet_group_pager").querySelector('._4-u2').querySelector('.groupsStreamMemeberBox') !== null || document.querySelector('\'#' + msg.text + '\'') !== null ) {
            
            
            console.log('1');
            var list = [];
            var len = document.querySelectorAll(".userContent").length;
            var more = document.querySelectorAll('.see_more_link');
            for (let i = 0; i < len - 1; i++) {
                var id = document.querySelector("#pagelet_group_mall").querySelector("div").querySelectorAll("._4-u2, .mbm, ._4mrt, ._5jmm, ._5pat, ._5v3q, ._7cqq, ._4-u8")[i].getAttribute('id');
                var author = document.querySelectorAll('.userContentWrapper')[i].querySelector(".fwn .fcg").textContent;
                var content = document.querySelectorAll('.userContentWrapper')[i].querySelector(".userContent").textContent;
                if (document.querySelectorAll('.userContentWrapper')[i].querySelector(".userContent").querySelector(".text_exposed_show") !== null) {
                    content = content.replace('...', '');
                    content = content.replace('Zobacz więcej', '');
                    console.log(i);
                    //content += document.querySelectorAll(".userContent")[i].querySelector(".text_exposed_show").textContent;
                }
                var date = document.querySelectorAll('.userContentWrapper')[i].querySelector('abbr._5ptz').getAttribute('title');
            var image =[];
console.log(document.querySelectorAll('.userContentWrapper')[i].querySelectorAll('._5dec').length);
                if (document.querySelectorAll('.userContentWrapper')[i].querySelectorAll('._4-eo, ._2t9n').length === 1) {
                    image = [document.querySelectorAll('.userContentWrapper')[i].querySelector('._4-eo, ._2t9n').querySelector('img').getAttribute('src')];
                } else if (document.querySelectorAll('.userContentWrapper')[i].querySelectorAll('._5dec').length > 1) {
                    let lenOfImages = document.querySelectorAll('.userContentWrapper')[i].querySelectorAll('._5dec, ._xcx, ._487t').length;
                    console.log('len:'+lenOfImages);
                    for (let j = 0; j < lenOfImages; j++) {
                        console.log('j:'+ j);
                        image.push(document.querySelectorAll('.userContentWrapper')[i].querySelectorAll('._5dec, ._xcx, ._487t')[j].querySelector('img').getAttribute('src'));
                        console.log(image);
                    }
                    console.log('lista:' + image);
                }
                let post = new Post(id, author, date, content, image);
                list.push((post));
            }
            sendResponse(list);
            //window.location.reload();
            window.scrollTo(0, 0);
            return 0;
        }
        scrolldelay = setTimeout(pageScroll, 1);
    }
    if (msg.text !== 'report_back') {
        console.log(msg.text);
        pageScroll();
        return true;
    }
});




