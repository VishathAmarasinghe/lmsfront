import React, { useEffect } from "react";
import { notification } from "antd";

const NotificationPopup = ({ description, message }) => {
  useEffect(() => {
    const closeNotification = () => {
      notification.close();
    };

    const timeout = setTimeout(closeNotification, 3000);

    return () => clearTimeout(timeout);
  }, []);

  notification.info({
    message: `${message}`,
    description: `${description}`,
    placement: "topRight",
  });

  
  return null;
};

export default NotificationPopup;
