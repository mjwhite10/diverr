import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
const Auth = () => {
  const navigate = useNavigate();
  const [hiddenMenu, setHiddenMenu] = useState(false);
  return (
    <div className="avatar" onClick={(e) => setHiddenMenu(!hiddenMenu)}>
      <img src="/images/avatar1.jpg" alt="Logo" className="avatar-image"></img>
      {hiddenMenu ? (
        <div className="avatar-list-container">
          <div id="createdAsc" onClick={(e) => navigate(`/user/${5}`)}>
            Mi cuenta
          </div>
          <div id="createdDesc">Mis diverrs</div>
          <div id="category">Cerrar sesión</div>
        </div>
      ) : null}
    </div>
  );
  // return (
  //   <ul className="auth">
  //     <li>
  //       <button
  //         onClick={(e) => navigate('/login')}
  //         className="auth-button auth-login"
  //       >
  //         Inicia sesión
  //       </button>
  //     </li>
  //     <li>
  //       <button
  //         onClick={(e) => navigate('/register')}
  //         className="auth-button auth-register"
  //       >
  //         Únete
  //       </button>
  //     </li>
  //   </ul>
  // );
};

export default Auth;
