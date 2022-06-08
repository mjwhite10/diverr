import { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const handleForm = async (e) => {
    e.preventDefault();
  };
  const onChangeBar = (e) => {
    setQuery(e.target.value);
  };
  return (
    <form className="search-container" onSubmit={handleForm}>
      <input
        className="search-input"
        placeholder="Buscar servicios"
        value={query}
        onChange={onChangeBar}
      ></input>
      <button className="search-button"></button>
    </form>
  );
};

export default SearchBar;
