var Post = class Post {

    constructor(id, author, date, content, image) {
        this.id = id;
        this.author = author;
        this.date = date;
        this.content = content;
        this.image = image;
    }
};
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
function pageScroll() {
    window.scrollBy(0,100);
    scrolldelay = setTimeout(pageScroll,1);
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    if (msg.text === 'report_back') {
        var list = [];

// while(document.querySelector(".uiList ._4cg3 ._509- ._4ki") === null){
//     window.scrollBy(0,100);
// }
            var len = document.querySelectorAll(".userContent").length;



        for (let i = 0; i < len; i++) {

            var id = document.querySelectorAll("._3ccb")[i].getAttribute('id');
            var author = document.querySelectorAll(".fwn .fcg")[i].textContent;
            var content = document.querySelectorAll(".userContent")[i].textContent;
            var date = document.querySelectorAll('abbr._5ptz')[i].getAttribute('title');
            if(document.querySelectorAll('.userContentWrapper')[i].querySelector('._4-eo') !== null) {
                var image = document.querySelectorAll('.userContentWrapper')[i].querySelector('._4-eo').getAttribute('href');
            }else{
                var image = '';
            }

            let post = new Post(id, author, date, content, image);
            list.push((post));
        }


            // window.scrollTo(0,document.querySelector(".pagelet_group_pager"));

    }

    sendResponse(list);


});