import { useCallback, useState } from "react";
import Notifications from "../notifications";

const useNotifications = (postion = "top-right") => {
  const [notification, setNotification] = useState(null);

  let timer;

  const triggerNotifications = useCallback((notificationProps) => {
    console.log("trigger", notificationProps);
    if (timer) {
      clearTimeout(timer);
    }

    setNotification(notificationProps);
    timer = setTimeout(() => {
      setNotification(null);
    }, notificationProps.duration);
  }, []);

  const NotificationComponent = notification ? (
    <div className={`${postion}`}>
      <Notifications {...notification} />
    </div>
  ) : null;

  return {
    triggerNotifications,
    NotificationComponent,
  };
};

export default useNotifications;
