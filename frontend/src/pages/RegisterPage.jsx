import { Link } from 'react-router-dom';
import { useState } from 'react';
import InputFieldForm from '../components/InputFieldForm';

const RegisterPage = () => {
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

    if (!username) {
      setErrorUsername('El nombre de usuario es obligatorio');
    } else if (!email) {
      setErrorMail('El email es obligatorio');
    } else if (!pass1 || !pass2) {
      setErrorPass('Los campos de contraseña son obligatorios');
    } else if (pass1 !== pass2) {
      setErrorPass('Las contraseñas deben ser iguales');
    }

    // Aquí petición

    return (
      <section>
        <h1>Registro</h1>
        <form onSubmit={handleForm}>
          <InputFieldForm
            label="Nombre de usuario"
            placeholder="Nombre de usuario"
            type="text"
            id="username"
            name="username"
            required
            autofocus="autofocus"
            onChange={(e) => setUsername(e.target.value)}
          >
            {error ? <p>{`${setErrorUsername}`}</p> : null}
          </InputFieldForm>

          <InputFieldForm
            label="Email"
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          >
            {error ? <p>{`${setErrorMail}`}</p> : null}
          </InputFieldForm>

          <InputFieldForm
            label="Contraseña"
            placeholder="Contraseña"
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPass1(e.target.value)}
          >
            {error ? <p>{`${setErrorPass}`}</p> : null}
          </InputFieldForm>

          <InputFieldForm
            label="Repetir contraseña"
            placeholder="Repetir contraseña"
            type="password"
            id="pass2"
            name="pass2"
            required
            onChange={(e) => setPass2(e.target.value)}
          >
            <p>{`${setErrorPass}`}</p>
          </InputFieldForm>

          <button>¡Únete!</button>

          <Link to="/login">¿Ya eres miembro? Ingresa</Link>
        </form>
      </section>
    );
  };
};
export default RegisterPage;
