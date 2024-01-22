import { useState } from "react";
import Modal from "./Modal";
import "./styles.css";

const CustomModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [content] = useState("Your Custom Message");

  return (
    <div className="main">
      <h1>Custom Modal</h1>
      <button onClick={() => setShowModal(true)}>OPNE MODAL</button>
      <Modal
        showModal={showModal}
        content={content}
        handleCloseModal={() => setShowModal(false)}
      />
    </div>
  );
};

export default CustomModal;
