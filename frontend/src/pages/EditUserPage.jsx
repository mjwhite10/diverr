import LoadAvatar from '../components/LoadAvatar';
import InputFieldForm from '../components/InputFieldForm';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import {
  editUserDataService,
  getUserDataService,
} from '../services/userService';
const EditUserPage = () => {
  const { token, updateUserData } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [sector, setSector] = useState('');
  const [errorSector, setErrorSector] = useState(false);

  const [sending, setSending] = useState(false);
  const [image, setImage] = useState('');

  //Antes de renderizar consultamos la info del user a la API
  useEffect(() => {
    const loadUserInfo = async () => {
      const userdata = await getUserDataService(token);
      setEmail(userdata.email);
      setName(userdata.name);
      setSector(userdata.info);
    };
    loadUserInfo();
  }, [token]);

  const handleFormEdit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const data = new FormData(e.target);
      if (image !== '') data.append('avatar', image);
      await editUserDataService(data, token);
      //Actualizamos los datos de usuario (asi el avatar del menu se actualiza tambuen)
      await updateUserData();
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

  return (
    <section className="edit-user-page">
      <form className="form form-edit" onSubmit={handleFormEdit}>
        <h2 style={{ marginBottom: '2rem' }}>Editar usuario</h2>
        <LoadAvatar className="edit-avatar" image={image} setImage={setImage} />
        <label htmlFor="email" style={{ marginTop: '2rem' }}>
          Email
        </label>
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

        <button className="form-button primary-button" type="submit">
          {sending ? 'Enviando...' : 'Confirmar cambio'}
        </button>
      </form>
    </section>
  );
};

export default EditUserPage;
