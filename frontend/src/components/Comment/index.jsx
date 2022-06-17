import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './style.css';

const Comment = ({ comment, removeComment, correctComment }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);

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
    } catch (error) {
      setError(error.message);
    }
  };

  const onSubmitEditForm = async (e) => {
    e.preventDefault();
    setEdit(false);
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
      {!edit ? (
        <article className="comment-text">
          <h3>{comment.user}</h3>
          <p className="comment-content">{comment.content}</p>
          <p className="comment-date">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </article>
      ) : (
        <form className="comment-text">
          <h3>{comment.user}</h3>
          <textarea type="text" id="text" name="comment" required></textarea>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <button
              className="form-button primary-button"
              onClick={onSubmitEditForm}
            >
              Editar
            </button>
            <button
              className="form-button primary-button"
              onClick={(e) => setEdit(false)}
            >
              {' '}
              ❌
            </button>
          </div>
        </form>
      )}
      {!edit && comment.user && user?.id === comment.idUser ? (
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
              setEdit(true);
            }}
          ></button>
          {error ? <p>{error}</p> : null}
        </aside>
      ) : null}
    </section>
  );
};

export default Comment;
