const InputFieldForm = ({ id, placeholder, error, type }) => {
  return (
    <section>
      <input name={id} id={id} type={type} placeholder={placeholder}></input>
      {error && <span>❌</span>}
      {error && <p>{error}</p>}
    </section>
  );
};

export default InputFieldForm;
