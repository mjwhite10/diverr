import { useState } from 'react';
import { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Comment = ({ comment, removeComment, correctComment }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  console.log(comment.user);

  const deleteComment = async (id) => {
    try {
      // await funcion borrar comentario ({id, token})
      // if (removeComment) {
      //   removeComment(id);
      // } else {
      //   navigate("/diverr/:id");
      // }
    } catch (error) {
      setError(error.message);
    }
  };

  const editComment = async (id) => {
    try {
      //await funcion editar comentario
      correctComment(id);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article>
      <p>{comment.content}</p>
      <p>
        Por {comment.user} {new Date(comment.createdAt).toLocaleString()}
      </p>
      {comment.user && user?.id === comment.idUser ? (
        <section>
          <button
            className="primary-button"
            onClick={() => {
              if (window.confirm('¿Estás seguro?')) deleteComment(comment.id);
            }}
          >
            Borrar comentario
          </button>
          <button
            className="primary-button"
            onClick={() => {
              if (window.confirm('¿Estás seguro?')) editComment(comment.id);
            }}
          >
            Editar comentario
          </button>
          {error ? <p>{error}</p> : null}
        </section>
      ) : null}
    </article>
  );
};

export default Comment;
