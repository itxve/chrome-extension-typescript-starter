import { PropsWithChildren } from "react";
export type FCProps<T> = Partial<PropsWithChildren<T>>;
export enum BedType {
  gitee = "gitee",
  github = "github",
  default = "default",
}
type SetStore<T> = (value: T, cb?: () => void) => void;
type GetStore<T> = () => Promise<T>;
export type DefalutBedType = Exclude<BedType, "default">;
import XhrRequest from "@ts/XhrRequest";

class Ntool {
  /**
   * dataURL转换为File
   * @param dataUrl
   * @returns
   */
  dataURLtoFile = (dataUrl: string, fileName: string) => {
    let arr = dataUrl.split(","),
      mime = arr[0].match(/:(.*?);/)![1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8Arr = new Uint8Array(n);
    while (n--) {
      u8Arr[n] = bstr.charCodeAt(n);
    }
    return new File(
      [
        new Blob([u8Arr], {
          type: mime,
        }),
      ],
      fileName
    );
  };
  /**
   * 使用当前tab发送消息给server-worker
   * @param message
   * @param cb
   */
  sendCosntentMeassge = (message: any, cb?: (response: any) => void) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id!, { message }, function (response) {
        cb && cb(response);
      });
    });
  };
  //创建一个面板
  createNewPopupWindow = () => {
    chrome.windows.create({
      url: "popup.html",
      type: "panel",
      state: "normal",
      width: 700,
      height: 500,
    });
  };

  /**
   * 上传文件
   * @param token
   * @param params
   * @param data
   */
  uploadFile = (
    token: string,
    params: { owner: string; repo: string; path: string },
    data = {}
  ) => {
    const re = new XhrRequest({
      baseUrl: "https://gitee.com/api/v5",
      token,
    });
    re.request({
      url: "/repos/:owner/:repo/contents/:path",
      method: "post",
      params,
      data,
    });
  };

  setLocalLanguage = () => {
    const re: XhrRequest = new XhrRequest({ baseUrl: "", token: "" });
    re.request({
      url: "/api/v3/setlocale",
      method: "post",
      async: true,
      header: {
        "content-type": "application/json",
      },
    });
    // X.open("POST", "", true);
    // xhr.setRequestHeader("content-type", "application/json");
    // var sendData = { locale: "zh-CN" };
    // xhr.send(JSON.stringify(sendData));
  };

  /**
   * 挺麻烦的感觉
   * @returns
   */
  defalutStore = () => {
    return this.gStores<DefalutBedType>(BedType.default)
      .get()
      .then((bedType) => {
        console.log("defalut use ", bedType);
        return this.gStores(bedType)
          .get()
          .then((item) => {
            return item as GitFormProps;
          });
      });
  };

  /**
   * request一个store对象
   * @param key
   * @returns
   */
  gStores<T>(key: BedType): {
    set: SetStore<T>;
    get: GetStore<T>;
  } {
    return {
      set: (value, cb = () => {}) => {
        chrome.storage.sync.set({ [key]: value }, cb);
      },
      get: () => {
        return new Promise((resolve) => {
          chrome.storage.sync.get(key, function (item) {
            resolve(item[key]);
          });
        });
      },
    };
  }
}

export default new Ntool();
