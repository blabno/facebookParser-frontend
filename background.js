(function () {
  function activatePopupHandler(request, sender) {
    if ('FBParser_Activate' === request.type) {
      chrome.pageAction.show(sender.tab.id);
    }
  }

  function onItem(request) {
    if ('FBParser_Item' === request.type) {
      //send item to backend
      console.log('Received item:', request);
    }
  }

  chrome.runtime.onMessage.addListener(activatePopupHandler);
  chrome.runtime.onMessage.addListener(onItem);
})();