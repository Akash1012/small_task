const Button = ({ onClick, text, customClass }) => {
  return (
    <button onClick={onClick} className={customClass}>
      {text}
    </button>
  );
};

export default Button;
