import { createContext, useEffect, useState } from 'react';
import { getAllDiverrsService } from '../services/diverrService';

const QueryContext = createContext();

const QueryContextProviderComponent = ({ children }) => {
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('');
  const [direction, setDirection] = useState('');
  const [filterArray, setFilterArray] = useState([]);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        let queryParam = '';
        queryParam += search ? `${search}` : '';
        queryParam += order ? `${order}` : '';
        queryParam += direction ? `${direction}` : '';
        if (queryParam !== '') {
          queryParam = '?' + queryParam;
          queryParam = queryParam.slice(0, -1);
        }
        const data = await getAllDiverrsService(queryParam);

        setResult(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [search, order, direction]);

  const searchText = (text) => {
    text ? setSearch(`search=${text}&`) : setSearch('');
  };
  const orderBy = (order) => {
    order ? setOrder(`order=${order}&`) : setOrder('');
  };
  const queryDirection = (direction) => {
    direction ? setDirection(`direction=${direction}&`) : setDirection('');
  };

  //A esta función sólo se debe de llamar tras aceptar/cancelar una diver/solucion,
  //de esta manera nos aseguramos que no se va a devolver ningun diver asignado
  //o en caso de cancelar la solucion que dicho diverr vuelva a estar disponible
  const updateData = async () => {
    try {
      setLoading(true);
      const data = await getAllDiverrsService('');
      setResult(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <QueryContext.Provider
      value={{
        searchText,
        orderBy,
        queryDirection,
        loading,
        error,
        result,
        updateData,
        setFilterArray,
        filterArray,
        filteredResults:
          filterArray.length > 0
            ? result.filter((diverr) => {
                return filterArray.includes(diverr.category);
              })
            : result,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export { QueryContext, QueryContextProviderComponent };
