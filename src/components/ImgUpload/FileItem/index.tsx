import React, { FC, useState, useEffect, useRef } from "react";
import type { FCProps } from "@ts/Ntool";
import Tip from "@ts/Tip";
import { fileToBase64, base64Content } from "@ts/utils";
import UploadUtils from "@ts/UploadUtils";
import { Progress } from "antd";
import DefalutTask from "@ts/Task";
type Status = "normal" | "exception" | "active" | "success";
import "./index.less";
const gUp = new UploadUtils();
const ats = new DefalutTask(2);
const FileItem: FC<FCProps<{ file: File }>> = ({ file }) => {
  const [percent, setPercent] = useState(0);
  const [progressStatus, setProgressStatus] = useState<Status>("normal");
  const [furl, setFurl] = useState("");
  //上传中的回调事件
  const uploadProgress = (ev: ProgressEvent) => {
    setPercent(Math.round(Number((ev.loaded / ev.total) * 100)));
    setProgressStatus("active");
  };

  const fileLoadProgress = (ev: ProgressEvent) => {
    if (ev.type === "load") {
      console.log("load");
    }
    console.log("load........");
  };
  const copy = () => {
    navigator.clipboard.writeText(furl).then(() => {
      Tip.destroyThen.success("复制成功");
    });
  };

  useEffect(() => {
    const fs = async () => {
      if (file) {
        ats.addTask({
          excute: () => {
            return fileToBase64(file, fileLoadProgress).then((result) => {
              return gUp
                .uploadFile(
                  file.name,
                  {
                    content: base64Content(result),
                    message: "文件上传",
                  },
                  uploadProgress
                )
                .then(({ content }) => {
                  setProgressStatus("success");
                  setFurl(content.download_url);
                })
                .catch((err) => {
                  setProgressStatus("exception");
                  console.error(err);
                });
            });
          },
        });
      }
    };
    fs();
  }, []);

  return (
    <div className="fileItem">
      <div>{file?.name}</div>
      <div className="item-warrper">
        <Progress
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          status={progressStatus}
          strokeWidth={3}
          type="line"
          percent={percent}
        />
        {!!furl && <button onClick={copy}>copy</button>}
      </div>
    </div>
  );
};

export default FileItem;
