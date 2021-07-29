import { message } from "antd";
import { MessageApi } from "antd/lib/message";
export default {
  get destroyThen(): MessageApi {
    message.destroy();
    return message;
  },
  message,
};
