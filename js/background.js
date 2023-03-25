chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("chat.openai.com")) {
    toggleRTL(tab);
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    updateIcon(tab.url);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    updateIcon(tab.url);
  }
});

function setIcon(iconName) {
  chrome.action.setIcon({
    path: {
      "16": `/icons/icon_16_${iconName}.png`,
      "48": `/icons/icon_48_${iconName}.png`,
      "128": `/icons/icon_128_${iconName}.png`,
    },
  });
};

function updateIcon(url) {
  chrome.storage.sync.get("rtlEnabled", (data) => {
    if (url.includes("chat.openai.com")) {
      setIcon(data.rtlEnabled ? "enabled" : "disabled");
    } else {
      setIcon("inactive");
    }
  });
}


function toggleRTL(tab) {
  chrome.storage.sync.get("rtlEnabled", (data) => {
    const newState = !data.rtlEnabled;
    chrome.storage.sync.set({ rtlEnabled: newState }, () => {
      updateIcon(tab.url);
    });
  });
}