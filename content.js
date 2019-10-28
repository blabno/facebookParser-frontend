(function () {
  chrome.runtime.sendMessage({ type: "FBParser_Activate" });

  function FBParser_processItems(request, _sender) {
    if ('FBParser_ProcessItems' === request.type) {
      //get items from page and send to background.js
      chrome.runtime.sendMessage({ type: 'FBParser_ITEM', payload: [{a: 'test' }, {b: 'test2'}] }); // Tempolary data
    }
  }

  chrome.runtime.onMessage.addListener(FBParser_processItems);
})();