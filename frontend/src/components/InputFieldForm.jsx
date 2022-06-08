export const InputFieldName = props => {
  const { label, type, id, name, error, placeholder, autofocus, onChange } =
    props;

export const InputFieldForm = ({ id, placeholder, error, type }) => {
  return (
    <section>
      <input name={id} id={id} type={type} placeholder={placeholder} autofocus={autofocus}></input>
      {error && <span>❌</span>}
      {error && <p style={{color:"red"}}>{error}</p>}
    </section>
  );
};
