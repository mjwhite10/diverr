import { useContext, useState } from 'react';
import { QueryContext } from '../context/QueryContext';

const OrderByMenu = () => {
  const { orderBy, queryDirection } = useContext(QueryContext);
  const [value, setValue] = useState('createdDesc');
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
        queryDirection('');
        break;
    }
  };
  return (
    <select
      name="order-list"
      id="order-list"
      onChange={handleSelect}
      value={value}
    >
      <option value="createdDesc">Más reciente</option>
      <option value="createdAsc">Más antiguo</option>
      <option value="category">Categoria</option>
      <option value="title">Titulo</option>
      <option value="priceAsc">Más barato</option>
      <option value="priceDesc">Más caro</option>
    </select>
  );
};
export default OrderByMenu;
