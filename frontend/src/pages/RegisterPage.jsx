import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InputFieldForm from '../components/InputFieldForm';
import { registerUserService } from '../services/userService';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword1, setErrorPassword1] = useState(false);
  const [errorPassword2, setErrorPassword2] = useState(false);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setErrorName(false);
    setErrorEmail(false);
    setErrorPassword1(false);
    setErrorPassword2(false);
    //Verificamos que las passwords sean iguales

    try {
      if (password1 !== password2) throw Error('Las contraseñas no coinciden');
      await registerUserService(email, password1, name);
      navigate('/login');
    } catch (error) {
      if (error.message.includes('nombre')) {
        setErrorName(error.message);
      }
      if (error.message.includes('email')) {
        setErrorEmail(error.message);
      }
      if (error.message.includes('contraseña')) {
        setErrorPassword1(error.message);
        setErrorPassword2(error.message);
      }
    }
    // Aquí petición
  };
  return (
    <section className="register-page">
      <form className="form" onSubmit={handleForm}>
        <h1>Registro</h1>
        <label htmlFor="username">Nombre de usuario</label>
        <InputFieldForm
          id={'name'}
          placeholder={'Nombre de usuario'}
          error={errorName}
          setError={setErrorName}
          type="text"
          setValue={setName}
          autofocus={true}
        />
        <label htmlFor="email">Email</label>
        <InputFieldForm
          id={'email'}
          placeholder={'email@email.com'}
          error={errorEmail}
          setError={setErrorEmail}
          type={'text'}
          setValue={setEmail}
        />
        <label htmlFor="password1">Contraseña</label>
        <InputFieldForm
          id={'password1'}
          placeholder={''}
          error={errorPassword1}
          setError={setErrorPassword1}
          type={'password'}
          setValue={setPassword1}
        />

        <label htmlFor="password2">Repetir contraseña</label>
        <InputFieldForm
          id={'password2'}
          placeholder={''}
          error={errorPassword2}
          setError={setErrorPassword2}
          type={'password'}
          setValue={setPassword2}
        />

        <button className="form-button primary-button">¡Únete!</button>
        <Link className="link" to="/login">
          ¿Ya eres miembro? Ingresa
        </Link>
      </form>
    </section>
  );
};
export default RegisterPage;
