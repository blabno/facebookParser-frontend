'use strict';

class Post {
  constructor(id, author, date, content, files, images, comments) {
    this.id = id;
    this.author = author;
    this.date = date;
    this.content = content;
    this.files = files;
    this.images = images;
    this.comments = comments;
  }
}

class Comment {
  constructor(author, date, content, images, comments) {
    this.author = author;
    this.date = date;
    this.content = content;
    this.images = images;
    this.comments = comments;
  }
}

class CommentCC {
  constructor(author, date, content, images) {
    this.author = author;
    this.date = date;
    this.content = content;
    this.images = images;
  }
}

function getData(idp, list) {
  while (document.querySelectorAll(".userContentWrapper").length) {
    let main = document.querySelector("._5pcb");
    let id = main.querySelector('._4mrt').getAttribute('id');
    if (id === idp) {
      return list;
    }
    let postContent = document.querySelector('.userContentWrapper');
    let author = postContent.querySelector('.fwn .fcg').textContent;
    let content = postContent.querySelector('.userContent').textContent;
    if (postContent.querySelector('.userContent').querySelector('.text_exposed_show') !== null) {
      content = content.replace('...', '');
      content = content.replace('Zobacz więcej', '');
    }
    let date = postContent.querySelector('._5ptz').getAttribute('title');
    let files = [];
    let fileContent = postContent.querySelector('.mtm');
    if (fileContent) {
      if (fileContent.querySelector('._5-sx')) {
        files.push(fileContent.querySelector('a').getAttribute('href'));
      }
    }
    let images = [];
    if (postContent.querySelectorAll('._4-eo').length === 1) {
      images = [postContent.querySelector('._4-eo').querySelector('img').getAttribute('src')];
    } else if (postContent.querySelectorAll('._5dec').length > 1) {
      let lenOfImages = postContent.querySelectorAll('._5dec').length;
      let image = postContent.querySelectorAll('._5dec');
      for (let j = 0; j < lenOfImages; j++) {
        images.push(image[j].querySelector('img').getAttribute('src'));
      }
    }
    let comments = [];

    let commentsContent = postContent.querySelector('.commentable_item').querySelector('._3w53');
    if (commentsContent) {
      if (commentsContent.querySelector('._7791')) {
        const btn = commentsContent.querySelector('div').querySelector('._4ssp');
        if (btn) {
          btn.click();
        }
        const btn1 = commentsContent.querySelector('._7791').querySelectorAll('._2h2j');
        for (let i = 0; i < btn1.length; i++) {
          if (btn1[i].querySelector('div')) {
            if (btn1[i].querySelector('div').querySelector('a')) {
              if (btn1[i].querySelector('div').querySelector('a').getAttribute('role') === 'button') {
                btn1[i].querySelector('div').querySelector('a').click();
              }
            }
          }
        }
        setTimeout(getComments, 1000);

        function getComments() {
          if (commentsContent.querySelector('._43u6')) {
            commentsContent.querySelector('._43u6').remove();
          }
          let comment = commentsContent.querySelector('._7791').querySelector('li');
          while (comment) {
            let authorC = comment.querySelectorAll('a')[1].textContent;
            let contentC = comment.querySelector('._3l3x') ? comment.querySelector(
              '._3l3x').textContent : '';
            let dateC = comment.querySelector('abbr').getAttribute('data-tooltip-content');
            let imageC = [];
            while (comment.querySelector('._4eeo ._2tx5')) {
              if (comment.querySelector('._4eeo ._2tx5').querySelector('img')) {
                imageC.push(comment.querySelector('._4eeo ._2tx5').querySelector('img').src);
              }
              comment.querySelector('._4eeo ._2tx5').remove();
            }
            comment.querySelector('div').remove();
            let commentsCC = [];

            let commentAnswer = comment.querySelector('div').querySelector('._4eek');
            while (commentAnswer) {
              let authorCC = commentAnswer.querySelectorAll('a')[1].textContent;
              let contentCC = commentAnswer.querySelector('._3l3x') ? commentAnswer.querySelector('._3l3x').textContent : '';
              let dateCC = commentAnswer.querySelector('abbr').getAttribute('data-tooltip-content');
              let imageCC = [];
              while (commentAnswer.querySelector('._4eeo ._2tx5')) {
                imageCC.push(commentAnswer.querySelector('._4eeo').querySelector('img').src);
                commentAnswer.querySelector('._4eeo').remove();
              }
              commentsCC.push(new CommentCC(authorCC, dateCC, contentCC, imageCC));
              commentAnswer.remove();
              commentAnswer = comment.querySelector('div').querySelector('._4eek');
            }

            comments.push(new Comment(authorC, dateC, contentC, imageC, commentsCC));
            comment.remove();
            comment = commentsContent.querySelector('._7791').querySelector('li');
          }
        }
      }
    }
    list.push(new Post(id, author, date, content, files, images, comments));
    postContent.parentElement.parentElement.remove();
  }
  window.scrollBy(0, 1);
  window.scrollTo(0, 0);
  return list;
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  window.scrollTo(0, 0);
  let list = [];

  function init() {
    if (document.getElementById('' + msg.text) !== null || document.querySelector("#pagelet_group_pager") .querySelector('._4-u2').querySelector('.groupsStreamMemeberBox') !== null) {
      setTimeout(function () {
        sendResponse([...new Set(getData(msg.text, list))]);
        window.location.reload();
      },1500);
      return 0;
    } else if (document.querySelectorAll(".userContentWrapper").length) {
      getData(msg.text, list);
    }
    setTimeout(init, 1);
  }

  if (msg.text !== 'report_back') {
    init();
    return true;
  }
});