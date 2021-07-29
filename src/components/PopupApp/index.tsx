import React, { FC, useState, useEffect } from "react";
import "./bed.less";
import ConfigGit from "./ConfigGit";
import { Tabs, Button } from "antd";
import setup from "@assets/setup.svg";
import ImgUpload from "@com/ImgUpload";
import Ntool, { BedType } from "@ts/Ntool";

const { TabPane } = Tabs;
const PopupApp: FC = () => {
  const [toggle, seToggle] = useState(false);
  const [configed, setConfig] = useState(false);
  const setClick = () => {
    seToggle(!toggle);
  };

  useEffect(() => {
    Ntool.defalutStore()
      .then((rs) => {
        setConfig(!!rs);
        seToggle(!!rs);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  return (
    <div className="main">
      {configed && (
        <Button className="setting" onClick={setClick}>
          <img className="icon-setting" src={setup} />
          设置
        </Button>
      )}
      <div className={toggle ? "hidden" : ""}>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Gitee" key="gitee">
            <ConfigGit setConfig={setConfig} type={BedType.gitee} />
          </TabPane>
          {/* <TabPane tab="GitHub" key="github">
            <ConfigGit setConfig={setConfig} type={BedType.github} />
          </TabPane> */}
        </Tabs>
      </div>
      <div className={!toggle ? "hidden" : ""}>
        <ImgUpload />
      </div>
    </div>
  );
};

export default PopupApp;
