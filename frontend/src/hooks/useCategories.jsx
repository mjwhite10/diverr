import { useEffect } from 'react';
import { useState } from 'react';
import { getAllDiverrsCategories } from '../services/diverrService';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getAllDiverrsCategories();
        data.forEach((element) => {
          element.checked = true;
        });
        setCategories(data);
      } catch (error) {
        setError(error);
      }
    };
    loadCategories();
  }, []);

  return { categories, error };
};
export default useCategories;
