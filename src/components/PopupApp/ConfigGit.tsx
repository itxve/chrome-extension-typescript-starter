import React, { FC, useEffect } from "react";
import Nt, { DefalutBedType, FCProps, BedType } from "@ts/Ntool";
import { Form, Input, Button } from "antd";
const { useForm } = Form;

const Git: FC<{ type: BedType; setConfig: (configed: boolean) => void }> = (
  props
) => {
  const { type, setConfig } = props;
  const gitee = Nt.gStores<GitFormProps>(type);
  const defaultStore = Nt.gStores<DefalutBedType>(BedType.default);
  const [form] = useForm<GitFormProps>();
  const layout = {
    labelCol: { xs: { span: 6 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 18 }, sm: { span: 14 } },
  };
  useEffect(() => {
    gitee.get().then((item) => {
      form.setFieldsValue(item);
    });
  });

  const onFinish = (values: GitFormProps) => {
    gitee.set(values);
    setConfig(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const defalutBed = async () => {
    defaultStore.set(type as DefalutBedType);
  };

  return (
    <div className="giteeCard">
      <Form
        name="basic"
        {...layout}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="设置仓库名"
          name="repo"
          rules={[{ required: true, message: "设置仓库名" }]}
        >
          <Input placeholder="格式：username/repo" />
        </Form.Item>

        <Form.Item
          label="设置分支名"
          name="branch"
          rules={[{ required: true, message: "设置分支名" }]}
        >
          <Input placeholder="例如：master" />
        </Form.Item>

        <Form.Item
          label="设置Token"
          name="token"
          rules={[{ required: true, message: "设置Token" }]}
        >
          <Input.Password placeholder="token" />
        </Form.Item>

        <Form.Item
          label="设置存储路径"
          name="path"
          rules={[{ required: true, message: "设置存储路径" }]}
        >
          <Input placeholder="例如：image/" />
        </Form.Item>
        <Form.Item label="设置自定义域名" name="customUrl">
          <Input placeholder="例如：http(s)://xxx.com" />
        </Form.Item>
        <div className="action">
          <Button onClick={defalutBed}>设置为默认云床</Button>
          <Button htmlType="submit">保存</Button>
        </div>
      </Form>
    </div>
  );
};
export default Git;
