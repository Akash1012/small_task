import { useState } from "react";
import "./style.css";

function AccordianList(props) {
  const {
    item: { title, body, id },
  } = props;

  const [show, setShow] = useState(false);

  const toogle = () => {
    setShow((prevValue) => !prevValue);
  };

  return (
    <div className="accordian">
      <div className="accordian-title">
        <h3>{title}</h3>
        <button onClick={() => toogle(id)} className="accordian-icon">
          {show ? "-" : "+"}
        </button>
      </div>
      {show && <p>{body}</p>}
    </div>
  );
}

export default AccordianList;
