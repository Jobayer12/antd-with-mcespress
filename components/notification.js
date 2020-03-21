import { notification } from "antd";

export const successNotificaiton = (type, placement, message, description) => {
  notification[type]({
    message: message,
    description: description,
    placement
  });
};
