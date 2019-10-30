class Post {
  id = null;
  href = null;
  groupId = null;
  postTime = null;
  postOwner = {
    name: null,
    link: null,
    id: null,
  };
  postMessage = {
    text: null,
    images: null
  };
  postDOMElement = null;

  constructor(postElement) {
    this.postDOMElement = postElement;
    this.setPostTime();
    this.setUrl();
    this.setPostOwner();
    this.setPostMessage();
  }

  setPostTime() {
    const time = this.postDOMElement.querySelector('[id^=feed_subtitle] abbr').dataset.utime + '000';
    this.postTime = Number(time);
  }

  setUrl() {
    const element = this.postDOMElement.querySelector('[id^=feed_subtitle] abbr').parentElement;
    const url = element.href.split('/');
    this.href = element.href;
    this.groupId = url[4];
    this.id = url[6];
  }

  setPostOwner() {
    const postOwnerElement = this.postDOMElement.querySelector('h5 a');
    console.log([postOwnerElement]);
    this.postOwner.name = postOwnerElement.textContent;
    this.postOwner.link = postOwnerElement.href.split('?')[0];
    this.postOwner.id = new URL(`http://test.xyz${postOwnerElement.dataset.hovercard}`).searchParams.get('id');
  }


  setPostMessage() {
    const removeUnnecessaryElements = (element) => {
      const unnecessaryElements = element.querySelectorAll('[class="text_exposed_hide"]');
      if (unnecessaryElements.length) {
        for (let elementToRemove in unnecessaryElements) {
          elementToRemove.remove();
        }
      }
    };
    const postMessageElement = this.postDOMElement.querySelector('[data-testid="post_message"]');
    if (postMessageElement) {
      removeUnnecessaryElements(postMessageElement);
      this.postMessage.text = postMessageElement.textContent;
    }
    //Todo: parse post with images
  }

  getData() {
    return {
      id: this.id,
      href: this.href,
      groupId: this.groupId,
      time: this.postTime,
      owner: this.postOwner,
      message: this.postMessage
    }
  }
}