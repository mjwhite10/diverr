import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputFieldForm from '../components/InputFieldForm';

const LoginPage = ({ hideItems }) => {
  //Antes de renderizar ocultamos los componentes de búsqueda

  useEffect(() => {
    hideItems(true);
  });
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPass, setErrorPass] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();
  };
  return (
    <section className="login-page">
      <form className="login-form" onSubmit={handleForm}>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <InputFieldForm
          className="inputField"
          id={'email'}
          placeholder={'email@email.com'}
          error={errorEmail}
          type={'text'}
        />
        <label htmlFor="password">Contraseña</label>
        <InputFieldForm
          className="inputField"
          id={'password'}
          placeholder={''}
          error={errorPass}
          type={'password'}
        />
        <button className="login-button">Iniciar sesión</button>
        <Link className="link" to="/register">
          ¿No eres miembro? ¡Regístrate!
        </Link>
      </form>
    </section>
  );
};
export default LoginPage;
