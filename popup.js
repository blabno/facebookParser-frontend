(function () {
  const elements = {
    startButton: document.getElementById('start'),
    status: document.getElementById('status')
  };

  function start() {
    const start = document.getElementById('startDate').value;
    const end = document.getElementById('endDate').value;
    chrome.runtime.sendMessage({ type: 'FBParser_START', payload: { start, end } });
  }

  function processItems(request) {
    if ('FBParser_ProcessItems' === request.type) {
      elements.status.innerText = 'Processing...';
    }
  }

  chrome.runtime.onMessage.addListener(processItems);
  elements.startButton.onclick = start;
})();