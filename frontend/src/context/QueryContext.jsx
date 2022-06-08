import { createContext, useEffect, useState } from 'react';
import { getAllDiverrsService } from '../services/diverrService';

const QueryContext = createContext();

const QueryContextProviderComponent = ({ children }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  useEffect(() => {
    const loadDiverrs = async () => {
      try {
        const queryParam = query ? `?search=${query}` : '';
        const data = await getAllDiverrsService(queryParam);
        setResult(data);
      } catch (error) {
      } finally {
      }
    };
    loadDiverrs();
  }, [query]);

  const searchText = (text) => {
    setQuery(text);
  };
  const clearQuery = () => setQuery('');
  return (
    <QueryContext.Provider value={{ searchText, clearQuery, result }}>
      {children}
    </QueryContext.Provider>
  );
};

export { QueryContext, QueryContextProviderComponent };
