(function () {
  const data = {
    currentTabId: null,
    currentTabUrl: null
  };
  const elements = {
    startButton: document.getElementById('start'),
    status: document.getElementById('status')
  };

  async function init() {
    const tabs = await new Promise(resolve => chrome.tabs.query({ active: true, currentWindow: true }, resolve));
    data.currentTabId = tabs[0].id;
    data.currentTabUrl = tabs[0].url;

    getStatus();
    elements.startButton.onclick = start;

    setInterval(() => {
      getStatus();
    }, 1000);
  }

  function start() {
    // const start = document.getElementById('startDate').value;
    // const end = document.getElementById('endDate').value;
    // chrome.runtime.sendMessage({ type: 'FBParser_START', payload: { start, end } });
    chrome.tabs.sendMessage(data.currentTabId, { type: 'FBParser_Start' });
  }

  function parseStatus(status) {
    elements.status.innerText = status || '';
  }

  function getStatus() {
    chrome.tabs.sendMessage(data.currentTabId, { type: 'FBParser_GetStatus' }, parseStatus);
  }

  init();
})();