const Checkbox = ({ title, state, onChange }) => {
  return (
    <>
      <div className="checkbox">
        <input type="checkbox" checked={state} onChange={onChange} />
        <label>{title}</label>
      </div>
    </>
  );
};

export default Checkbox;
