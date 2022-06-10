import { useContext, useState } from 'react';
import { QueryContext } from '../../context/QueryContext';
import './style.css';

const SearchBar = ({ hidden }) => {
  const [value, setValue] = useState('');
  const { searchText } = useContext(QueryContext);

  //Cuando damos click o hacemos enter, pasamos al contexto la query
  const handleForm = async (e) => {
    e.preventDefault();
    searchText(value);
  };

  return (
    <>
      {!hidden ? (
        <form className="search-container" onSubmit={handleForm}>
          <input
            className="search-input"
            placeholder="Buscar diverrs..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>

          <button className="search-button"></button>
        </form>
      ) : null}
    </>
  );
};

export default SearchBar;
