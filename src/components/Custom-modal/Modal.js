import { useEffect } from "react";

import "./styles.css";

const Modal = (props) => {
  const { showModal, content, handleCloseModal } = props;

  const closeModal = () => {
    handleCloseModal();
  };

  const keyDownHandler = (key) => {
    if (key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => document.removeEventListener("keydown", keyDownHandler);
  }, []);

  if (!showModal) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close-icon">X</span>
        </div>
        <div className="modal-body">
          <div>{content}</div>
        </div>
        <div className="modal-footer">
          <button onClick={closeModal}>ok</button>
          <button onClick={closeModal}>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
