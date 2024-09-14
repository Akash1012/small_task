import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";
import "./notification.css";

const iconsStyles = {
  marginRight: "10px",
};

const icons = {
  success: <AiOutlineCheckCircle style={iconsStyles} />,
  info: <AiOutlineInfoCircle style={iconsStyles} />,
  warnings: <AiOutlineWarning style={iconsStyles} />,
  error: <AiOutlineCloseCircle style={iconsStyles} />,
};

const Notifications = ({ type = "info", message, onClose = () => {} }) => {
  return (
    <div className={`notification ${type}`}>
      {/* {icons[type]} */}
      {message}
      {/* <AiOutlineCloseCircle
        className="closeBtn"
        color="white"
        onClick={() => onClose()}
      /> */}
    </div>
  );
};

export default Notifications;
