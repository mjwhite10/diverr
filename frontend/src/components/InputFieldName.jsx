export const InputFieldName = props => {
  const { label, type, id, name, error, placeholder, autofocus } = props;

  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        autoFocus={autofocus}
      />
      {error && <span>❌</span>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </fieldset>
  );
};
