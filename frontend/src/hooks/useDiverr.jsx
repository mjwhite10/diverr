import { useEffect, useState } from 'react';
import { getAllDiverrsService } from '../services/diverrService';

const useDiverrs = () => {
  const [diverrs, setDiverrs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDiverrs = async () => {
      try {
        setLoading(true);
        const data = await getAllDiverrsService();
        setDiverrs(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadDiverrs();
  }, []);

  return { diverrs, loading, error };
};

export default useDiverrs;
