const InputFieldForm = ({
  id,
  placeholder,
  error,
  type,
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
        autofocus={autofocus}
        required={required}
      ></input>
      {error && <span>❌</span>}
      {error && <p className="error">{error}</p>}
    </section>
  );
};

export default InputFieldForm;
