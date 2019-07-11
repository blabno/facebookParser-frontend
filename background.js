'use strict';

function activatePopupHandler (request, sender) {
  if (request.message === "activate_icon") {
    chrome.pageAction.show(sender.tab.id);
  }
}

chrome.extension.onMessage.addListener(activatePopupHandler);
