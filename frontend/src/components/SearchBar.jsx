import { useContext, useEffect, useState } from 'react';
import { QueryContext } from '../context/QueryContext';

const SearchBar = ({ location }) => {
  const [value, setValue] = useState('');
  const { searchText } = useContext(QueryContext);

  //Cuando damos click o hacemos enter, pasamos al contexto la query
  const handleForm = async (e) => {
    e.preventDefault();
    searchText(value);
  };

  return (
    <form className="search-container" onSubmit={handleForm}>
      <input
        className="search-input"
        placeholder="Buscar servicios"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button className="search-button"></button>
    </form>
  );
};

export default SearchBar;
