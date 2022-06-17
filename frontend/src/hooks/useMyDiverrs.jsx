import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { listUserDiverrsService } from '../services/userService';
const useMyDiverrs = () => {
  const [myDiverrs, setMyDiverrs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadDivers = async () => {
      try {
        setLoading(true);
        const data = await listUserDiverrsService(token);
        setMyDiverrs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadDivers();
  }, []);

  return { myDiverrs, loading, error };
};

export default useMyDiverrs;
