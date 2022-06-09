import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputFieldForm from '../components/InputFieldForm';

const RegisterPage = ({ hideItems }) => {
  //Antes de renderizar ocultamos los componentes de búsqueda
  useEffect(() => {
    hideItems(true);
  });
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [error, setError] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [errorPass, setErrorPass] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();

    // Aquí petición
  };
  return (
    <section className="register-page">
      <form className="register-form" onSubmit={handleForm}>
        <h1 className="h1-register">Registro</h1>
        <label htmlFor="username">Nombre de usuario</label>
        <InputFieldForm
          className="register-input"
          label="Nombre de usuario"
          placeholder="Nombre de usuario"
          type="text"
          id="username"
          name="username"
          required
          autofocus="autofocus"
          onChange={(e) => setUsername(e.target.value)}
        >
          {error ? <p>{errorUsername}</p> : null}
        </InputFieldForm>

        <label htmlFor="email">Email</label>
        <InputFieldForm
          className="register-input"
          label="Email"
          placeholder="Email"
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        >
          {error ? <p>{errorMail}</p> : null}
        </InputFieldForm>

        <label htmlFor="password">Contraseña</label>
        <InputFieldForm
          className="register-input"
          label="Contraseña"
          placeholder="Contraseña"
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPass1(e.target.value)}
        >
          {error ? <p>{errorPass}</p> : null}
        </InputFieldForm>

        <label htmlFor="pass2">Repetir contraseña</label>
        <InputFieldForm
          className="register-input"
          label="Repetir contraseña"
          placeholder="Repetir contraseña"
          type="password"
          id="pass2"
          name="pass2"
          required
          onChange={(e) => setPass2(e.target.value)}
        >
          <p>{errorPass}</p>
        </InputFieldForm>
        <button className="register-button">¡Únete!</button>
        <Link className="link" to="/login">
          ¿Ya eres miembro? Ingresa
        </Link>
      </form>
    </section>
  );
};
export default RegisterPage;
