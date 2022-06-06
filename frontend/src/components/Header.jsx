import { Link } from 'react-router-dom';
import Auth from './Auth';

const Header = () => {
  return (
    <header className="header">
      <h1>
        <Link to="/" className="link">
          <img
            src="/images/LOGO_DIVERR.svg"
            alt="Logo"
            style={{ width: '150px' }}
          ></img>
        </Link>
      </h1>
      <nav>
        <Auth />
      </nav>
    </header>
  );
};

export default Header;
