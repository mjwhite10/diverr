import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { listUserDiverrsSolutionService } from '../services/userService';
const useMyDiverrsAsigned = () => {
  const [myAssignedDiverrs, setMyAssignedDiverrs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadDivers = async () => {
      try {
        setLoading(true);
        const data = await listUserDiverrsSolutionService(token);
        setMyAssignedDiverrs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadDivers();
  }, [token]);

  return { myAssignedDiverrs };
};

export default useMyDiverrsAsigned;
