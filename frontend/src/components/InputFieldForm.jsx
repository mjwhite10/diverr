export const InputFieldName = props => {
  const { label, type, id, name, error, placeholder, autofocus, onChange } =
    props;

  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        autoFocus={autofocus}
        onChange={onChange}
      />
      {error && <span>❌</span>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </fieldset>
  );
};
