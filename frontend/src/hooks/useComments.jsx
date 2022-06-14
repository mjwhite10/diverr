import { useEffect } from 'react';
import { useState } from 'react';
import { getAllDiverrComments } from '../services/diverrService';

const useComments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        const data = await getAllDiverrComments(id);
        setComments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadComments();
  }, [id]);

  const addComment = (comment) => {
    setComments([comment, ...comments]);
  };

  const removeComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return { comments, loading, error, addComment, removeComment };
};

export default useComments;
