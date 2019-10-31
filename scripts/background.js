(function () {
  function activatePopupHandler(request, sender) {
    if ('FBParser_Activate' === request.type) {
      chrome.pageAction.show(sender.tab.id);
    }
  }

  chrome.runtime.onMessage.addListener(activatePopupHandler);
})();