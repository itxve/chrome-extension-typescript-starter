import XhrRequest from "@ts/XhrRequest";
import Ntool from "@ts/Ntool";

interface RsUpload {
  content: {
    download_url: string;
  };
  commit: { sha: string };
}
export default class UploadUtils {
  private octokit: XhrRequest;
  private config!: GitFormProps;
  constructor() {
    this.octokit = new XhrRequest({
      baseUrl: "https://gitee.com/api/v5",
    });
    this.initConfig();
  }
  initConfig = async () => {
    this.config = await Ntool.defalutStore();
  };

  /**
   * 上传文件
   * @param token
   * @param params
   * @param data
   */
  uploadFile = (
    fileName: string,
    data: { content: string; message?: string },
    uploadProgress?: (ev: ProgressEvent) => void
  ): Promise<RsUpload> => {
    const { path, token } = this.config;
    const newPath = [path, Date.now() + fileName].join("/");
    return new Promise((resolve, reject) => {
      try {
        this.octokit
          .upload({
            upload: {
              onprogress: (ev: ProgressEvent) => {
                uploadProgress?.(ev);
              },
            },
            url: "/repos/:repo/contents/:path",
            method: "post",
            params: { ...this.config, path: newPath },
            data: {
              access_token: token,
              message: `add ${fileName}`,
              ...data,
            },
          })
          .then((res) => {
            resolve(
              Object.assign(JSON.parse(String(res.response))) as RsUpload
            );
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
}
