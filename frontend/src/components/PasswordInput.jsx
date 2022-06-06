import { useState } from "react";

export const PasswordInput = () => {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  return (
    <>
      <fieldset>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={e => setPass1(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="pass2">Repeat password</label>
        <input
          type="password"
          id="pass2"
          name="pass2"
          required
          onChange={e => setPass2(e.target.value)}
        />
      </fieldset>
    </>
  );
};
