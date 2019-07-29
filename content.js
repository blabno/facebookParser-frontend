var Post = class Post {

    constructor(id, author, date, content) {
        this.id = id;
        this.author = author;
        this.date = date;
        this.content = content;
    }
};



chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    if (msg.text === 'report_back') {

       // window.scrollTo(0,document.querySelector(".pagelet_group_pager"));
        var len = document.querySelectorAll(".userContent").length;
        var list = [];


        for (let i = 0; i < len; i++) {

            var id = document.querySelectorAll("._3ccb")[i].getAttribute('id');
            var author = document.querySelectorAll(".fwn .fcg")[i].textContent;
            var content = document.querySelectorAll(".userContent")[i].textContent;
            var date = document.querySelectorAll('abbr._5ptz')[i].getAttribute('title');
            let post = new Post(id, author, date, content);
            list.push(JSON.stringify(post));
        }

    }

    sendResponse(list);


});