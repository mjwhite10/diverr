import { useContext } from 'react';
import { useState } from 'react';
import { QueryContext } from '../../context/QueryContext';
import useCategories from '../../hooks/useCategories';
import './style.css';
const FilterMenu = () => {
  const { filterArray, setFilterArray } = useContext(QueryContext);
  const [hiddenMenu, setHiddenMenu] = useState(true);
  const { categories } = useCategories();

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const categories = [];

    for (const [name] of data.entries()) {
      categories.push(name);
    }
    setFilterArray(categories);
  };

  return (
    <>
      <div
        className="filter-list"
        onMouseLeave={(e) => {
          setHiddenMenu(true);
        }}
      >
        <button
          className="filter-list-button"
          onClick={(e) => setHiddenMenu(!hiddenMenu)}
        >
          <i className="filter-list-button-icon" />
          Filtrar
        </button>
        {!hiddenMenu && (
          <form onSubmit={handleSubmitForm}>
            <ul className="filter-list-container">
              {categories.map((category) => {
                return (
                  <li key={category.id}>
                    <input
                      defaultChecked={filterArray.includes(
                        category.description
                      )}
                      type="checkbox"
                      name={category.description}
                      id={category.description}
                    />
                    <label htmlFor={category.description}>
                      {category.description}
                    </label>
                  </li>
                );
              })}
              <button className="secondary-button">Aceptar</button>
            </ul>
          </form>
        )}
      </div>
    </>
  );
};

export default FilterMenu;
