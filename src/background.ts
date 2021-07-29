import Nt from "@ts/Ntool";

chrome.runtime.onInstalled.addListener((r) => {
  if (r.reason == "install") {
  }
});

/**
 * 动态注入脚本
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    Nt.sendCosntentMeassge("发送消息");
    // chrome.tabs.executeScript({
    //   file: "content_script.js",
    // });
  }
});
//打开新窗口
chrome.action.onClicked.addListener((e) => {
  Nt.createNewPopupWindow();
});
