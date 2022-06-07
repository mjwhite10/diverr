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
    <form>
      <input
        placeholder="¿Que estás buscando hoy?"
        value={query}
        onChange={onChangeBar}
      ></input>
      <button className="button"></button>
    </form>
  );
};

export default SearchBar;
