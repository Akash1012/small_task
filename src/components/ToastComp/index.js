import useNotifications from "./Hooks/use-notification";

const Toast = () => {
  const { triggerNotifications, NotificationComponent } =
    useNotifications("bottom-left");

  return (
    <>
      <button
        onClick={() =>
          triggerNotifications({
            type: "success",
            message: "File sent successfully",
            duration: 3000,
          })
        }
      >
        Trigger Success
      </button>

      <button
        onClick={() =>
          triggerNotifications({
            type: "error",
            message: "Error",
            duration: 3000,
          })
        }
      >
        Error
      </button>
      {NotificationComponent}
    </>
  );
};

export default Toast;
