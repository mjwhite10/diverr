import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "./style.css"

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
      <p className='comment-data'>
        Por {comment.user} el {new Date(comment.createdAt).toLocaleString()}
      </p>
      <p className='comment-content'>{comment.content}</p>
      {comment.user && user?.id === comment.idUser ? (
        <section>
          <button
            className="primary-button delete-comment-button"
            onClick={() => {
              if (window.confirm('¿Estás seguro?')) deleteComment(comment.id);
            }}
          >
          </button>
          <button
            className="primary-button edit-comment-button"
            onClick={() => {
              if (window.confirm('¿Estás seguro?')) editComment(comment.id);
            }}
          >
          </button>
          {error ? <p>{error}</p> : null}
        </section>
      ) : null}
    </article>
  );
};

export default Comment;
