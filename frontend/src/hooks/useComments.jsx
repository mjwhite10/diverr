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
  const editComment = (comment) => {
    setComments(
      comments.map((c) => {
        if (c.id === comment.id) {
          return comment;
        } else {
          return c;
        }
      })
    );
  };
  const removeComment = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  return { comments, loading, error, addComment, editComment, removeComment };
};

export default useComments;
