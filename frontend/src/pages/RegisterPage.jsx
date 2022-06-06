import { Link } from "react-router-dom";
import { EmailInput } from "../components/EmailInput";
import UsernameInput from "../components/UsernameInput";
import { PasswordInput } from "../components/PasswordInput";
import { Emoji } from "../components/Emoji";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUserService } from "../services";
import "./RegisterPage.css";

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
      return;
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
        <UsernameInput />
        <EmailInput />
        <PasswordInput />
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
