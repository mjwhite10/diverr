import LoadAvatar from '../components/LoadAvatar';
import InputFieldForm from '../components/InputFieldForm';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editUserPasswordService } from '../services/userService';
const SecurityPage = ({}) => {
  const { token, logout, updateUserData } = useContext(AuthContext);
  const [oldPassword, setOldPasswod] = useState('');
  const [errorOldPassword, setErrorOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState(false);
  const navigate = useNavigate();
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
      if (error.message === 'La contraseña no es válida') {
        setErrorOldPassword(error.message);
      } else {
        setErrorNewPassword(error.message);
      }
    }
  };
  return (
    <section className="security-page">
      <form className="form form-change-password" onSubmit={handleFormPassword}>
        <h2>Cambiar Contraseña</h2>

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
        <button className="form-button primary-button">
          Cambiar contraseña
        </button>
      </form>
    </section>
  );
};
export default SecurityPage;
