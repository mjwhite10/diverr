import { useState } from 'react';
import InputFieldForm from '../components/InputFieldForm';

const LoginPage = () => {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPass, setErrorPass] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();
  };
  return (
    <section className="login-page">
      <form className="login-form" onSubmit={handleForm}>
        <label htmlFor="email">Email</label>
        <InputFieldForm
          className="inputField"
          id={'email'}
          placeholder={'email@email.com'}
          error={errorEmail}
          type={'text'}
        />
        <label htmlFor="password">Password</label>
        <InputFieldForm
          className="inputField"
          id={'password'}
          placeholder={''}
          error={errorPass}
          type={'password'}
        />
        <button>Iniciar sesión</button>
      </form>
    </section>
  );
};
export default LoginPage;
