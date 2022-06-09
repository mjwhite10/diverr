import { useContext, useState } from 'react';
import { QueryContext } from '../context/QueryContext';

const OrderByMenu = ({ hidden }) => {
  const { orderBy, queryDirection } = useContext(QueryContext);
  const [value, setValue] = useState('');
  const handleSelect = (e) => {
    setValue(e.target.value);
    // e.preventDefault();

    switch (e.target.value) {
      case 'createdAsc':
        orderBy('createdAt');
        queryDirection('ASC');
        break;
      case 'createdDesc':
        orderBy('createdAt');
        queryDirection('DESC');
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
        orderBy(e.target.value);
        queryDirection('DESC');
        break;
    }
  };
  return (
    <>
      {!hidden ? (
        <select
          name="order-list"
          id="order-list"
          onChange={handleSelect}
          value={value}
        >
          <option value="" disabled hidden>
            Ordenar
          </option>
          <option value="createdDesc">Más reciente</option>
          <option value="createdAsc">Más antiguo</option>
          <option value="category">Categoria</option>
          <option value="title">Titulo</option>
          <option value="priceAsc">Precio más barato</option>
          <option value="priceDesc">Precio más caro</option>
        </select>
      ) : null}
    </>
  );
};
export default OrderByMenu;
