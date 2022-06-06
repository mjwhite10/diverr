import { useState } from "react";

const UsernameForm = () => {
  const [username, setUsername] = useState("");
  return (
    <fieldset>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="usrname"
        required
        onChange={e => setUsername(e.target.value)}
      />
    </fieldset>
  );
};

export default UsernameForm;
