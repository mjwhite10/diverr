import { useContext, useState } from 'react';
import { QueryContext } from '../../context/QueryContext';
import './style.css';

const OrderMenu = ({ hidden }) => {
  const { orderBy, queryDirection } = useContext(QueryContext);
  const [hiddenMenu, setHiddenMenu] = useState(true);

  const handleSelect = (e) => {
    switch (e.target.id) {
      case 'createdAsc':
        orderBy('createdAt');
        queryDirection('DESC');
        break;
      case 'createdDesc':
        orderBy('createdAt');
        queryDirection('ASC');
        break;
      case 'priceAsc':
        orderBy('price');
        queryDirection('ASC');
        break;
      case 'priceDesc':
        orderBy('price');
        queryDirection('DESC');
        break;

      default:
        orderBy(e.target.id);
        queryDirection('ASC');
        break;
    }
  };

  return (
    <>
      {!hidden ? (
        <div className="order-list" onMouseLeave={(e) => setHiddenMenu(true)}>
          <button
            className="order-list-button"
            onClick={(e) => setHiddenMenu(!hiddenMenu)}
          >
            <i className="order-list-button-icon" />
            Ordenar
          </button>

          {!hiddenMenu ? (
            <div className="order-list-container">
              <div id="createdAsc" onClick={handleSelect}>
                Más reciente
              </div>
              <div id="createdDesc" onClick={handleSelect}>
                Más antiguo
              </div>
              <div id="category" onClick={handleSelect}>
                Categoria
              </div>
              <div id="title" onClick={handleSelect}>
                Titulo
              </div>
              <div id="priceAsc" onClick={handleSelect}>
                Precio más barato
              </div>
              <div id="priceDesc" onClick={handleSelect}>
                Precio más caro
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
export default OrderMenu;
