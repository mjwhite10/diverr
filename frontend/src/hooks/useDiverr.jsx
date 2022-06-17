import { useEffect } from 'react';
import { useState } from 'react';
import { getSingleDiverrService } from '../services/diverrService';
const useDiverr = ({ id }) => {
  const [diverr, setDiverr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getSingleDiverrService(id);
        setDiverr(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return { diverr, loading, error };
};

export default useDiverr;
