chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    updateIconAndPopup(tab.url);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateIconAndPopup(tab.url);
  }
});

const manifestData = chrome.runtime.getManifest();

function updateIconAndPopup(url) {
  if (url.includes("chat.openai.com")) {
    chrome.action.setIcon({ path : manifestData.action.default_icon });
    chrome.action.setPopup({ popup: "popup.html" });
  } else {
    chrome.action.setIcon({
      path: {
        "16": "/icons/icon_16_disabled.png",
        "48": "/icons/icon_48_disabled.png",
        "128": "/icons/icon_128_disabled.png"
      }
    });
    chrome.action.setPopup({ popup: "" });
  }
}
