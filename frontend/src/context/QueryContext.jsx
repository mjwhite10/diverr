import { createContext, useEffect, useState } from 'react';
import { getAllDiverrsService } from '../services/diverrService';

const QueryContext = createContext();

const QueryContextProviderComponent = ({ children }) => {
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('');
  const [direction, setDirection] = useState('');
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
  return (
    <QueryContext.Provider
      value={{ searchText, orderBy, queryDirection, loading, error, result }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export { QueryContext, QueryContextProviderComponent };
