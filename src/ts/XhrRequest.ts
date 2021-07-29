import {
  isFormData,
  isArrayBuffer,
  isObject,
  isBuffer,
  isFile,
  isBlob,
  isArrayBufferView,
  isString,
  isNumber,
} from "./utils";

export interface OpenOptions extends DefaltRequestConfig {
  method: keyof MethodsMap;
  url: string;
  header?: { [key: string]: string };
  async?: boolean;
  upload?: {
    onprogress: (this: XMLHttpRequest, ev: ProgressEvent) => any;
  };
  data?: { [key: string]: any };
  params?: { [key: string]: any };
}

interface DefaltRequestConfig {
  transformRequest?: () => {};
  transformResponse?: () => {};
  timeout?: number;
  withCredentials?: boolean;
}

type MethodsMap = {
  delete: "DELETE";
  get: "GET";
  patch: "PATCH";
  post: "POST";
  put: "PUT";
};

export interface XhrRequestInstance {
  prototype: XhrRequest;
  new (): XhrRequest;
}

type InitSettingConfig = Readonly<
  Partial<{ baseUrl: string; token: string; urlPrefix?: string }>
>;
type UploadConfig = Readonly<OpenOptions>;
type RequestConfig = Readonly<Omit<OpenOptions, "upload">>;
type XhrResult = Readonly<
  Pick<XMLHttpRequest, "response" | "responseText" | "responseType">
>;
type Request<T> = (options: T) => Promise<XhrResult>;
type TransformData = (data: any, headers?: { [key: string]: string }) => any;
export default class XhrRequest {
  private initConfig: InitSettingConfig;
  constructor(config: InitSettingConfig) {
    this.initConfig = config;
  }

  upload: Request<UploadConfig> = (options) => {
    return this.fetch(options);
  };

  request: Request<RequestConfig> = (options) => {
    return this.fetch(options);
  };

  /**
   * 将url RestFul
   * @param url
   * @param data
   * @returns
   */
  private resolveUrl = (url: string, data?: { [key: string]: any }) => {
    if (data) {
      const { urlPrefix = ":" } = this.initConfig;
      Object.keys(data).forEach((k) => {
        if (isString(data[k]) || isNumber(data[k])) {
          url = url.replace(`${urlPrefix}${k}`, data[k]);
        }
      });
    }
    return url;
  };

  /**
   * 请求响应data
   * @default
   * @param data
   * @param headers
   * @returns
   */
  private transformResponse: TransformData = (data, headers) => {
    if (
      isFormData(data) ||
      isArrayBuffer(data) ||
      isBuffer(data) ||
      isFile(data) ||
      isBlob(data)
    ) {
      return data;
    }
    if (isArrayBufferView(data)) {
      return data.buffer;
    }
    if (isObject(data)) {
      return JSON.stringify(data);
    }
  };

  /**
   * 转换请求data
   * @default
   * @param data
   * @param headers
   * @returns
   */
  private transformRequest: TransformData = (data, headers) => {
    if (
      isFormData(data) ||
      isArrayBuffer(data) ||
      isBuffer(data) ||
      isFile(data) ||
      isBlob(data)
    ) {
      return data;
    }
    if (isArrayBufferView(data)) {
      return data.buffer;
    }
    if (
      isObject(data) ||
      (headers && headers["Content-Type"].indexOf("application/json") !== -1)
    ) {
      return JSON.stringify(data);
    }
  };

  private fetch: Request<OpenOptions> = (options) => {
    const {
      method,
      url,
      async = true,
      header = {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
      params,
      upload,
    } = options;
    const { baseUrl, token } = this.initConfig;
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      try {
        request.open(method, baseUrl + this.resolveUrl(url, params), async);
        Object.keys(header).forEach((key) => {
          request.setRequestHeader(key, header[key]);
        });
        if (token) {
          request.setRequestHeader("Authorization", `token ${token}`);
        }
        if (upload) {
          request.upload.onprogress = upload.onprogress;
        }
        request.onerror = (e) => {
          reject(e);
        };
        request.onreadystatechange = function (e) {
          if (this.readyState == 4) {
            if ([200, 201, 304].includes(this.status)) {
              resolve(this);
            } else {
              reject(this.response);
            }
          }
        };
        request.send(this.transformRequest(data, header));
      } catch (error) {
        reject(error);
      }
    });
  };
}
