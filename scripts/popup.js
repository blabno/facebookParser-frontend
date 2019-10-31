(function () {
  const data = {
    currentTabId: null,
    currentTabUrl: null
  };
  const elements = {
    startButton: document.getElementById('start'),
    stopButton: document.getElementById('stop'),
    status: document.getElementById('status')
  };

  async function init() {
    const tabs = await new Promise(resolve => chrome.tabs.query({ active: true, currentWindow: true }, resolve));
    data.currentTabId = tabs[0].id;
    data.currentTabUrl = tabs[0].url;

    getStatus();
    elements.startButton.onclick = start;
    elements.stopButton.onclick = stop;

    setInterval(() => {
      getStatus();
    }, 1000);
  }

  function start() {
    chrome.tabs.sendMessage(data.currentTabId, { type: 'FBParser_Start' });
  }

  function stop() {
    chrome.tabs.sendMessage(data.currentTabId, { type: 'FBParser_STOP' });
  }

  function parseStatus(status) {
    elements.status.innerText = status;
  }

  function getStatus() {
    chrome.tabs.sendMessage(data.currentTabId, { type: 'FBParser_GetStatus' }, parseStatus);
  }

  init();
})();