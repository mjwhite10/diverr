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
    <section>
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
    </section>
  );
};

export default InputFieldForm;
