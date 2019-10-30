(function () {
  function activatePopupHandler(request, sender) {
    if ('FBParser_Activate' === request.type) {
      chrome.pageAction.show(sender.tab.id);
    }
  }

  function onPostItem(request, _sender, callback) {
    if ('FBParser_PostItem' === request.type) {
      console.log('Received item:', request.post);
      //Send to backend
    }
  }

  chrome.runtime.onMessage.addListener(activatePopupHandler);
  chrome.runtime.onMessage.addListener(onPostItem);
})();