import { useEffect } from 'react';
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

  useEffect(() => {
    const filterData = async () => {
      // if (checked.join()) {
      //   console.log('(' + checked.join() + ')');
      // } else {
      //   console.log('no data');
      // }
    };

    filterData();
  }, [checked]);

  const onCheckOption = (e) => {
    var updatedList = [...checked];
    if (e.target.checked) {
      updatedList = [...checked, e.target.id];
    } else {
      updatedList.splice(checked.indexOf(e.target.id), 1);
    }
    setChecked(updatedList);
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
          {!hiddenMenu ? (
            <div className="filter-list-container">
              {categories.map((category) => {
                return (
                  <div key={category.id}>
                    <input
                      type="checkbox"
                      id={category.id}
                      onChange={onCheckOption}
                      value={category}
                    />
                    <label htmlFor={category.id}>{category.description}</label>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default FilterMenu;
