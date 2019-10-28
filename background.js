(function () {
  const data = {
    tabId: null
  };
  
  function activatePopupHandler(request, sender) {
    if ('FBParser_Activate' === request.type) {
      data.tabId = sender.tab.id;
      chrome.pageAction.show(data.tabId);
    }
  }

  function process(request, _sender) {
    if ('FBParser_START' === request.type) {
      chrome.tabs.sendMessage(data.tabId, { type: 'FBParser_ProcessItems', test: ' aaaaa a a a ' });
    }
  }

  function onItem(request) {
    if ('FBParser_ITEM' === request.type) {
      //send item to backend
      console.log('Received item:', request);
    }
  }

  chrome.runtime.onMessage.addListener(activatePopupHandler);
  chrome.runtime.onMessage.addListener(process);
  chrome.runtime.onMessage.addListener(onItem);
})();