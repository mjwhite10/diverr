import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InputFieldForm from '../components/InputFieldForm';
import { loginUserService } from '../services/userService';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setErrorEmail(false);
    setErrorEmail(false);
    try {
      const data = await loginUserService(email, password);
      login(data);
      navigate('/');
    } catch (error) {
      if (error.message.includes('email')) {
        setErrorEmail(error.message);
      }
      if (error.message.includes('contraseña')) {
        setErrorPassword(error.message);
      }
      console.log(error);
    }
  };
  return (
    <section className="login-page">
      <form className="form" onSubmit={handleForm}>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <InputFieldForm
          id={'email'}
          placeholder={'email@email.com'}
          error={errorEmail}
          setError={setErrorEmail}
          type={'text'}
          setValue={setEmail}
          autofocus={true}
        />
        <label htmlFor="password">Contraseña</label>
        <InputFieldForm
          id={'password'}
          placeholder={''}
          error={errorPassword}
          setError={setErrorPassword}
          type={'password'}
          setValue={setPassword}
        />
        <button className="form-button primary-button">Iniciar sesión</button>
        <Link className="link" to="/register">
          ¿No eres miembro? ¡Regístrate!
        </Link>
      </form>
    </section>
  );
};
export default LoginPage;
