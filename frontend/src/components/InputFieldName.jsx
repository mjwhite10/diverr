import { useState } from "react";

export const InputFieldName = props => {
  const { label, type, id, name } = props;

  const [value, setValue] = useState("");

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={name} onChange={onChange} />
    </fieldset>
  );
};
