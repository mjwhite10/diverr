import LoadAvatar from '../components/LoadAvatar';
import InputFieldForm from '../components/InputFieldForm';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
const EditUserPage = () => {
  useEffect(() => {
    setEmail(user.email);
    setName(user.name);
    setSector(user.info ? user.info : '');
    console.log(user);
  }, []);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [sector, setSector] = useState('');
  const [errorSector, setErrorSector] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <section className="edit-user-page">
      <form className="form form-edit">
        <h2>Editar usuario</h2>
        <div className="col col1">
          <label htmlFor="email">Email</label>
          <InputFieldForm
            id={'email'}
            type={'text'}
            error={errorEmail}
            setError={setErrorEmail}
            setValue={setEmail}
            value={email}
          />
          <label htmlFor="nombre">Nombre</label>
          <InputFieldForm
            id={'nombre'}
            type={'text'}
            error={errorName}
            setError={setErrorName}
            setValue={setName}
            value={name}
          />
          <label htmlFor="Sector">Sector</label>
          <InputFieldForm
            id={'sector'}
            type={'text'}
            error={errorSector}
            setError={setErrorSector}
            setValue={setSector}
            value={sector}
          />
        </div>
        <div className="col col2">
          <LoadAvatar />
        </div>

        <button className="form-button primary-button" type="submit">
          Confirmar cambio
        </button>
      </form>

      <form className="form form-change-password">
        <h2>Cambiar Contraseña</h2>
        <div className="col">
          <label htmlFor="password1">Introduce la nueva contraseña</label>
          <InputFieldForm id={'password1'} type={'password'} />
          <label htmlFor="password1">Repite la nueva contraseña</label>
          <InputFieldForm id={'password1'} type={'password'} />
        </div>
        <button className="form-button primary-button" type="submit">
          Cambiar contraseña
        </button>
      </form>
    </section>
  );
};

export default EditUserPage;
