import './style.css';
const InputFieldForm = ({
  id,
  placeholder,
  error,
  type,
  className,
  autofocus = false,
  required = true,
}) => {
  return (
    <>
      <input
        name={id}
        id={id}
        type={type}
        placeholder={placeholder}
        autoFocus={autofocus}
        required={required}
        className={className}
      ></input>
      {error && <span>❌</span>}
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default InputFieldForm;
