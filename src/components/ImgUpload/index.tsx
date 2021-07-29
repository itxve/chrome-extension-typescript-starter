import React, { FC, useState } from "react";
import "./index.less";
import { Upload, UploadProps } from "antd";
import FileItem from "./FileItem";
const { Dragger } = Upload;
type FileItemProps = {
  file: File;
};
const ImgUpload: FC = () => {
  const [files, setFiles] = useState<Array<FileItemProps>>([]);
  const dProps: UploadProps = {
    customRequest: (optiosn) => {
      const fs = files;
      setFiles(fs.concat({ file: optiosn.file as File }));
    },
    fileList: [],
    multiple: true,
    // directory: true,
  };
  return (
    <div className="upload">
      <Dragger {...dProps}>
        <p className="ant-upload-drag-icon">
          上传文件 <span>支持拖拽</span>
        </p>
      </Dragger>
      <div className="file-list">
        {files.map((it, index) => (
          <FileItem key={`ft${index}`} file={it.file} />
        ))}
      </div>
    </div>
  );
};

export default ImgUpload;
