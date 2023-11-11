import "./style.css";

function AccordianList_2(props) {
  const {
    item: { title, body, id },
    saveId,
    setSaveId,
  } = props;

  const toogle = (id) => {
    if (id === saveId) {
      setSaveId(-1);
      return;
    }
    setSaveId(id);
  };

  return (
    <div className="accordian">
      <div className="accordian-title">
        <h3>{title}</h3>
        <button onClick={() => toogle(id)} className="accordian-icon">
          {saveId === id ? "-" : "+"}
        </button>
      </div>
      {saveId === id && <p>{body}</p>}
    </div>
  );
}

export default AccordianList_2;
