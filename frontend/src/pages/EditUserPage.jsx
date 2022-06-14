import LoadAvatar from '../components/LoadAvatar';
import InputFieldForm from '../components/InputFieldForm';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  editUserDataService,
  editUserPasswordService,
  getUserDataService,
} from '../services/userService';
const EditUserPage = () => {
  const { token, logout } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [sector, setSector] = useState('');
  const [errorSector, setErrorSector] = useState(false);
  const [oldPassword, setOldPasswod] = useState('');
  const [errorOldPassword, setErrorOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState(false);
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  //Antes de renderizar consultamos la info del user a la API
  useEffect(() => {
    const loadUserInfo = async () => {
      const userdata = await getUserDataService(token);
      setEmail(userdata.email);
      setName(userdata.name);
      setSector(userdata.info);
    };
    loadUserInfo();
  }, []);

  const handleFormEdit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const data = new FormData(e.target);
      if (image !== '') data.append('avatar', image);
      await editUserDataService(data, token);
      //Forzamos una recarga de la página para que actualice el resto de componentes
      window.location.reload(false);
    } catch (error) {
      console.log(error.message);
      if (error.message.includes('email')) {
        setErrorEmail(error.message);
      }
      if (error.message.includes('nombre')) {
        setErrorName(error.message);
      }
      if (error.message.includes('info')) {
        setErrorSector(error.message);
      }
    } finally {
      setSending(false);
    }
  };
  const handleFormPassword = async (e) => {
    e.preventDefault();
    setErrorNewPassword(false);
    setErrorOldPassword(false);
    //Verificamos que las passwords sean iguales

    try {
      await editUserPasswordService({ oldPassword, newPassword }, token);
      logout();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="edit-user-page">
      <form className="form form-edit" onSubmit={handleFormEdit}>
        <h2>Editar usuario</h2>
        <div className="col col1">
          <label htmlFor="email">Email</label>
          <InputFieldForm
            className="algo"
            id={'email'}
            type={'email'}
            error={errorEmail}
            setError={setErrorEmail}
            setValue={setEmail}
            value={email}
          />
          <label htmlFor="name">Nombre</label>
          <InputFieldForm
            id={'name'}
            type={'text'}
            error={errorName}
            setError={setErrorName}
            setValue={setName}
            value={name}
          />
          <label htmlFor="Sector">Sector</label>
          <InputFieldForm
            id={'info'}
            type={'text'}
            error={errorSector}
            setError={setErrorSector}
            setValue={setSector}
            value={sector}
          />
        </div>
        <div className="col col2">
          <LoadAvatar image={image} setImage={setImage} />
        </div>

        <button className="form-button primary-button" type="submit">
          {sending ? 'Enviando...' : 'Confirmar cambio'}
        </button>
      </form>

      <form className="form form-change-password" onSubmit={handleFormPassword}>
        <h2>Cambiar Contraseña</h2>
        <div className="col">
          <label htmlFor="password1">Introduce contraseña actual</label>
          <InputFieldForm
            id={'password1'}
            type={'password'}
            error={errorOldPassword}
            setError={setErrorOldPassword}
            setValue={setOldPasswod}
            value={oldPassword}
          />
          <label htmlFor="password2">Introduce la nueva contraseña</label>
          <InputFieldForm
            id={'password2'}
            type={'password'}
            error={errorNewPassword}
            setError={setErrorNewPassword}
            setValue={setNewPassword}
            value={newPassword}
          />
        </div>
        <button className="form-button primary-button" type="submit">
          Cambiar contraseña
        </button>
      </form>
    </section>
  );
};

export default EditUserPage;
