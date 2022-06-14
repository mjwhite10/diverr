import './style.css';
const InputFieldForm = ({
  id,
  placeholder,
  error,
  setError,
  type,
  autofocus = false,
  required = true,
  setValue,
  value,
}) => {
  return (
    <div className="input-field-form-container">
      <input
        className="input-field-form"
        name={id}
        id={id}
        type={type}
        placeholder={placeholder}
        autoFocus={autofocus}
        required={required}
        onChange={(e) => {
          setValue(e.target.value);
          setError(false);
        }}
        value={value}
      ></input>
      {error && <span>❌</span>}

      {error && <p className="input-field-form-error">{error}</p>}
    </div>
  );
};

export default InputFieldForm;
