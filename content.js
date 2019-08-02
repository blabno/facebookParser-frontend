var Post = class Post {

    constructor(id, author, date, content, image) {
        this.id = id;
        this.author = author;
        this.date = date;
        this.content = content;
        this.image = image;
    }
};
function deleteSeeMore(text, del){

}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    function pageScroll() {
        window.scrollBy(0, 1000);
        if (document.querySelector("#pagelet_group_pager").querySelector('._4-u2').querySelector('.groupsStreamMemeberBox') !== null) {
            console.log('1');
            var list = [];
            var len = document.querySelectorAll(".userContent").length;
            var more = document.querySelectorAll('.see_more_link');
            for (let i = 0; i < more.length; i++) {
                console.log(1);
                document.querySelectorAll('.see_more_link')[i].click();
            }
            for (let i = 0; i < len; i++) {

                var id = document.querySelector("#pagelet_group_mall").querySelector("div").querySelectorAll("._4-u2, .mbm, ._4mrt, ._5jmm, ._5pat, ._5v3q, ._7cqq, ._4-u8")[i].getAttribute('id');
                var author = document.querySelectorAll(".fwn .fcg")[i].textContent;
                var content = document.querySelectorAll(".userContent")[i].textContent;
                if( document.querySelectorAll(".userContent")[i].querySelector(".text_exposed_show") !== null){

                    content += document.querySelectorAll(".userContent")[i].querySelector(".text_exposed_show").textContent;
                }
                var date = document.querySelectorAll('abbr._5ptz')[i].getAttribute('title');
                var image;
                if (document.querySelectorAll('.userContentWrapper')[i].querySelector('._4-eo') !== null) {
                    image = document.querySelectorAll('.userContentWrapper')[i].querySelector('._4-eo').getAttribute('href');
                } else {
                   image = '';
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

    if (msg.text === 'report_back') {
        pageScroll();
        return true;
    }
});