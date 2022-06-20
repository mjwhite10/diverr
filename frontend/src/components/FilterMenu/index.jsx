import { useContext } from 'react';
import { useState } from 'react';
import { QueryContext } from '../../context/QueryContext';
import useCategories from '../../hooks/useCategories';
import './style.css';
const FilterMenu = ({ hidden }) => {
  const { filterCategory } = useContext(QueryContext);
  const [hiddenMenu, setHiddenMenu] = useState(true);
  const { categories } = useCategories();
  const [checked, setChecked] = useState([]);

  const onCheckOption = (e) => {
    var updatedList = [...checked];
    if (e.target.checked) {
      updatedList = [...checked, e.target.id];
    } else {
      updatedList.splice(checked.indexOf(e.target.id), 1);
    }
    setChecked(updatedList);
  };

  const onClickFilter = (e) => {
    filterCategory(checked);
  };

  return (
    <>
      {!hidden ? (
        <div
          className="filter-list"
          onMouseLeave={(e) => {
            setHiddenMenu(true);
            setChecked([]);
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
            <ul className="filter-list-container">
              {categories.map((category) => {
                return (
                  <li key={category.id}>
                    <input
                      type="checkbox"
                      id={category.description}
                      onChange={onCheckOption}
                    />
                    <label htmlFor={category.id}>{category.description}</label>
                  </li>
                );
              })}
              <button onClick={onClickFilter}>Aceptar</button>
            </ul>
          )}
        </div>
      ) : null}
    </>
  );
};

export default FilterMenu;
