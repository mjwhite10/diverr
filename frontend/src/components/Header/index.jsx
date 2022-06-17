import { Link } from 'react-router-dom';
import Auth from '../Auth';
import SearchBar from '../SearchBar';
import './style.css';

const Header = ({ hideSearchBar }) => {
  return (
    <header className={`header-bar ${hideSearchBar ? 'header-no-bar' : ''}`}>
      <h1>
        <Link to="/" className="link">
          <img src="/images/LOGO_DIVERR.svg" alt="Logo"></img>
        </Link>
      </h1>
      {!hideSearchBar ? <SearchBar hidden={hideSearchBar} /> : null}

      <Auth />
    </header>
  );
};

export default Header;
