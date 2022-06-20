import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getDiverrSolutionService } from '../services/diverrService';
const useDiverrSolution = ({ id }) => {
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    updateSolution({ id });
  }, []);

  const updateSolution = async ({ id }) => {
    try {
      setLoading(true);
      const data = await getDiverrSolutionService(id, token);
      setSolution(data);
    } catch (error) {
      setSolution(null);
    } finally {
      setLoading(false);
    }
  };

  return { solution, loading, updateSolution };
};

export default useDiverrSolution;
