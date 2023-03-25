document.getElementById("toggle-rtl").addEventListener("click", () => {
  chrome.storage.sync.get("rtlEnabled", (data) => {
    const newState = !data.rtlEnabled;
    chrome.storage.sync.set({ rtlEnabled: newState }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { rtlEnabled: newState });
      });
      updateButtonText(newState);
    });
  });
});

function updateButtonText(rtlEnabled) {
  const button = document.getElementById("toggle-rtl");
  button.textContent = rtlEnabled ? "Disable RTL" : "Enable RTL";
}

// Initialize button text based on stored state
chrome.storage.sync.get("rtlEnabled", (data) => {
  updateButtonText(data.rtlEnabled);
});