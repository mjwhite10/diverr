import { createContext, useEffect, useState } from 'react';
import { getAllDiverrsService } from '../services/diverrService';

const QueryContext = createContext();

const QueryContextProviderComponent = ({ children }) => {
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('');
  const [direction, setDirection] = useState('');
  const [filter, setFilter] = useState(false);
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
        // if (filter) {
        //   setResult(
        //     data.filter((diverr) => {
        //       if (filter.includes(diverr.category)) {
        //         return diverr;
        //       }
        //     })
        //   );
        // } else {
        //   setResult(data);
        // }

        setResult(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [search, order, direction, filter]);

  const searchText = (text) => {
    text ? setSearch(`search=${text}&`) : setSearch('');
  };
  const orderBy = (order) => {
    order ? setOrder(`order=${order}&`) : setOrder('');
  };
  const queryDirection = (direction) => {
    direction ? setDirection(`direction=${direction}&`) : setDirection('');
  };
  const filterCategory = (category) => {
    if (category.length === 0) {
      setFilter(!filter);
    } else {
      setResult(
        result.filter((diverr) => {
          if (category.includes(diverr.category)) {
            return diverr;
          }
        })
      );
    }
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
        filterCategory,
        loading,
        error,
        result,
        updateData,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export { QueryContext, QueryContextProviderComponent };
