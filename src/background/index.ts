chrome.action.onClicked.addListener((tab) => {
  if (!tab || !tab.id) return;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    (async () => {
      try {
        await chrome.tabs.sendMessage(tabId, {
          type: "URL_CHANGED",
        });
        return true;
      } catch (err) {}
    })();
  });
  return true;
});
