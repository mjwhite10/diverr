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
<<<<<<< HEAD
    <form className="search-bar">
      <input
=======
    <form className="form-container">
      <input 
>>>>>>> 41d929e6e78be46db7cf0b189351b3f13340708c
        className="search-container"
        placeholder="Buscar servicios"
        value={query}
        onChange={onChangeBar}
      ></input>
      <button className="search-button"></button>
    </form>
  );
};

export default SearchBar;
