import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './style.css';

const Comment = ({ comment, removeComment, correctComment }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  console.log(comment);

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
    <section className="comment">
      <figure>
        <img
          src={
            comment.avatar
              ? `${process.env.REACT_APP_BACKEND}/uploads/avatar/${comment.avatar}`
              : '../../images/logo-diverr2.svg'
          }
          alt="User"
          className="comment-header-avatar"
        />
      </figure>
      <article className="comment-text">
        <h3>{comment.user}</h3>
        <p className="comment-content">{comment.content}</p>
        <p className="comment-date">
          {new Date(comment.createdAt).toLocaleString()}
        </p>
      </article>
      {comment.user && user?.id === comment.idUser ? (
        <aside className="comment-buttons">
          <button
            className="primary-button delete-comment-button"
            onClick={() => {
              if (window.confirm('¿Estás seguro?')) deleteComment(comment.id);
            }}
          ></button>
          <button
            className="primary-button edit-comment-button"
            onClick={() => {
              if (window.confirm('¿Estás seguro?')) editComment(comment.id);
            }}
          ></button>
          {error ? <p>{error}</p> : null}
        </aside>
      ) : null}
    </section>
  );
};

export default Comment;
