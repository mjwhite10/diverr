import { useNavigate } from 'react-router-dom';
const Auth = () => {
  const navigate = useNavigate();
  return (
    <ul className="auth">
      <li>
        <button
          onClick={(e) => navigate('/login')}
          className="header-button login"
        >
          Inicia sesión
        </button>
      </li>
      <li>
        <button
          onClick={(e) => navigate('/register')}
          className="header-button register"
        >
          Únete
        </button>
      </li>
    </ul>
  );
};

export default Auth;

