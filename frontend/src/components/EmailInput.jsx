import { useState } from "react";

export const EmailInput = () => {
  const [email, setEmail] = useState("");

  return (
    <fieldset>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        onChange={e => setEmail(e.target.value)}
      />
    </fieldset>
  );
};
