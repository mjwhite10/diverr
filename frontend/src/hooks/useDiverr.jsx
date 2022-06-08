import { useEffect, useState } from 'react';
import { getAllDiverrsService } from '../services/diverrService';

const useDiverrs = () => {
  const [diverrs, setDiverrs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  useEffect(() => {
    const loadDiverrs = async () => {
      try {
        setLoading(true);
        const data = await getAllDiverrsService('');
        setDiverrs(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadDiverrs();
  }, [query]);
  const makeQuery = (query) => {
    setQuery(query);
  };
  return { diverrs, loading, error, makeQuery };
};

export default useDiverrs;
