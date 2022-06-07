import { Link } from "react-router-dom";
import { Emoji } from "../components/Emoji";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUserService } from "../services";
import "./RegisterPage.css";
import { InputFieldName } from "../components/InputFieldName";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");

  const handleForm = async e => {
    e.preventDefault();

    if (!username || !email || !pass1) {
      setError("You must fill every field");
    } else if (pass1 !== pass2) {
      setError("Passwords do not match");
    }

    try {
      await registerUserService({ username, email, password: pass1 });

      navigate("/login");
    } catch (error) {}
  };

  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={handleForm}>
        <InputFieldName
          label="Username"
          type="text"
          id="username"
          required
          onChange={e => setUsername(e.target.value)}
        />
        <InputFieldName
          label="Email"
          type="email"
          id="email"
          name="email"
          required
          onChange={e => setEmail(e.target.value)}
        />
        <InputFieldName
          label="Password"
          type="password"
          id="password"
          name="password"
          required
          onChange={e => setPass1(e.target.value)}
        />
        <InputFieldName
          label="Repeat password"
          type="password"
          id="pass2"
          name="pass2"
          required
          onChange={e => setPass2(e.target.value)}
        />

        <button>Register </button>
        {error ? (
          <p style={{ color: "red" }}>
            {error} <Emoji label="crossmark" symbol="❌" />
          </p>
        ) : null}
        <Link to="/login">Already a member? Log in</Link>
      </form>
    </section>
  );
};
export default RegisterPage;
