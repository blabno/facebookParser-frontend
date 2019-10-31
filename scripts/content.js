(function () {
  const FBParser = {
    stop: false,
    backendUrl: 'http://localhost:3000',
    status: {
      parsed: 0,
      saved: 0,
      message: null
    },
    isRunnig: false,
    postToSaveAtLast: null,
    lastSavedPost: null
  };

  function init() {
    chrome.runtime.sendMessage({ type: "FBParser_Activate" });
    if (!isExceptAddress()) {
      return
    }
    start();
  }

  function getStatus(request, _sender, callback) {
    if ('FBParser_GetStatus' === request.type) {
      if (FBParser.isRunnig) {
        callback(`${FBParser.status.message} ${FBParser.status.saved}/${FBParser.status.parsed}`);
      } else {
        callback('Idle');
      }
    }
  }

  function stop(request) {
    if ('FBParser_STOP' === request.type) {
      FBParser.stop = true;
    }
  }

  function prepareAddress() {
    let canBeUpdated = false;
    const url = new URL(window.location.href);
    const currentSorting = url.searchParams.get('sorting_setting');
    if ('CHRONOLOGICAL' !== currentSorting) {
      url.searchParams.set('sorting_setting', 'CHRONOLOGICAL');
      canBeUpdated = true;
    }
    const currentStatus = url.searchParams.get('fbparser_process');
    if ('true' !== currentStatus) {
      url.searchParams.set('fbparser_process', 'true');
      canBeUpdated = true;
    }
    if (canBeUpdated) {
      window.location.href = url;
    }
  }

  function isExceptAddress() {
    const url = new URL(window.location.href);
    const currentSorting = url.searchParams.get('sorting_setting');
    const currentStatus = url.searchParams.get('fbparser_process');
    return 'CHRONOLOGICAL' === currentSorting && 'true' === currentStatus;
  }

  function process(request) {
    if ('FBParser_Start' === request.type) {
      if (!isExceptAddress()) {
        prepareAddress();
        return
      }
      start();
    }
  }

  async function parseNextPost() {
    if (FBParser.stop) { //Todo: Improve, FBparser.postToSaveAtLast -> When start that post have been lost
      FBParser.isRunnig = false;
    }
    window.scrollTo(0, 100);
    const postElement = document.querySelector('div[id^=mall_post_]');
    if (!postElement) {
      const fetchingIndicatorElement = document.querySelector('div.async_saving');
      if (fetchingIndicatorElement) {
        setTimeout(parseNextPost, 250);
      }
      // Todo: check if FB show info 'No more posts' and save FBParser.postToSaveAtLast
      return;
    }
    const post = new Post(postElement).getData();
    if (post.id === FBParser.lastSavedPost) {
      await saveLastPost();
      return;
    }
    FBParser.status.parsed++;
    fetch(`${FBParser.backendUrl}/post`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      FBParser.status.saved++;
    }).catch(e => {
      console.log('- - - - -  FB  Parser  - - - - -');
      console.error(e);
      console.log('- - - - - E N D  L O G - - - - -');
    });
    postElement.remove();
    window.scrollTo(0, 101);
    setTimeout(parseNextPost);
  }

  async function saveLastPost() {
    return; // Tempolary not save
    await fetch(`${FBParser.backendUrl}/lastParsedPost`, {
      method: 'POST',
      body: JSON.stringify(FBParser.postToSaveAtLast),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      FBParser.status.saved++;
      FBParser.status.message = 'Done';
      FBParser.isRunnig = false;
    }).catch(e => {
      console.log('- - - - -  FB  Parser  - - - - -');
      console.error(e);
      console.log('- - - - - E N D  L O G - - - - -');
    });
  }

  function start() {
    if (FBParser.isRunnig) {
      return;
    }
    FBParser.status.message = 'Processing...';
    FBParser.isRunnig = true;
    const postElement = document.querySelector('div[id^=mall_post_]');
    FBParser.postToSaveAtLast = new Post(postElement).getData();
    if (!FBParser.postToSaveAtLast.groupId) {
      FBParser.status.message = `Can't process first post`;
      return;
    }
    fetch(`${FBParser.backendUrl}/lastParsedPost/${FBParser.postToSaveAtLast.groupId}`)
      .then(res => res.json())
      .then(res => {
        FBParser.lastSavedPost = res.postId;
        parseNextPost();
      }).catch(e => {
      console.log('- - - - -  FB  Parser  - - - - -');
      console.error(e);
      console.log('- - - - - E N D  L O G - - - - -');
    });

  }

  chrome.runtime.onMessage.addListener(process);
  chrome.runtime.onMessage.addListener(getStatus);
  chrome.runtime.onMessage.addListener(stop);
  init();
})();