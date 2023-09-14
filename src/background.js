chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.startsWith("https://chat.openai.com/")) {
    chrome.tabs.executeScript(tabId, { file: "src/content.js" });
  }
});
