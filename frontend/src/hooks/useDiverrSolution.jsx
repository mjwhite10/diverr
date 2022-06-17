import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getDiverrSolutionService } from '../services/diverrService';
const useDiverrSolution = ({ id }) => {
  const { token } = useContext(AuthContext);
  const [solution, setSolution] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getDiverrSolutionService(id, token);
        setSolution(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return { solution, loading, error };
};

export default useDiverrSolution;
