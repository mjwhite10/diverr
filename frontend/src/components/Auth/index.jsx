import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './style.css';
const Auth = () => {
  const navigate = useNavigate();
  const [hiddenMenu, setHiddenMenu] = useState(false);
  const { logout, user } = useContext(AuthContext);
  return user ? (
    <div
      className="avatar"
      onClick={(e) => setHiddenMenu(!hiddenMenu)}
      onMouseLeave={(e) => setHiddenMenu(false)}
    >
      <img
        src={`${process.env.REACT_APP_BACKEND}/uploads/avatar/${user.avatar}`}
        alt="Logo"
        className="avatar-image"
      ></img>
      {hiddenMenu ? (
        <div className="avatar-list-container">
          <div onClick={(e) => navigate(`/user/${user.id}`)}>Mi cuenta</div>
          <div onClick={(e) => navigate(`/user/${user.id}/diverr`)}>
            Mis diverrs
          </div>
          <div style={{ height: '6px' }}></div>
          <div onClick={(e) => logout()}>Cerrar sesión</div>
        </div>
      ) : null}
    </div>
  ) : (
    <nav>
      <ul className="auth">
        <li>
          <button
            onClick={(e) => navigate('/login')}
            className="auth-button auth-login"
          >
            Inicia sesión
          </button>
        </li>
        <li>
          <button
            onClick={(e) => navigate('/register')}
            className="auth-button auth-register"
          >
            Únete
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Auth;
