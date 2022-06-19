import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  deleteDiverrCommentService,
  editDiverrCommentService,
} from '../../services/diverrService';
import './style.css';

const Comment = ({ comment, removeComment, correctComment, allowComments }) => {
  const [error, setError] = useState('');
  const { user, token } = useContext(AuthContext);
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [textValue, setTextValue] = useState(comment.content);

  const deleteComment = async () => {
    try {
      await deleteDiverrCommentService(id, comment.id, token);
      removeComment(comment.id);
    } catch (error) {
      setError(error.message);
    }
  };

  const onSubmitEditForm = async (e) => {
    e.preventDefault();
    try {
      setEdit(false);

      const data = new FormData(e.target);
      const returnedComment = await editDiverrCommentService(
        id,
        comment.id,
        data,
        token
      );
      correctComment(returnedComment);
    } catch (error) {
      console.log(error);
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
      {!edit ? (
        <article className="comment-text">
          <h3>{comment.user}</h3>
          <p className="comment-content">{textValue}</p>
          <p className="comment-date">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
          {comment.modifiedAt && (
            <p className="comment-date modified-date">
              (Modificado el {new Date(comment.modifiedAt).toLocaleString()})
            </p>
          )}
        </article>
      ) : (
        <form className="comment-text" onSubmit={onSubmitEditForm}>
          <h3>{comment.user}</h3>
          <textarea
            type="text"
            id="content"
            name="content"
            required
            value={textValue}
            onChange={(e) => {
              setTextValue(e.target.value);
            }}
          ></textarea>
          <div
            className="edit-comment-button-container"
            // style={{
            //   display: 'flex',
            //   justifyContent: 'space-around',
            //   alignItems: 'center',
            // }}
          >
            <button className="form-button primary-button" type="submit">
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
      {!edit && comment.user && user?.id === comment.idUser && allowComments ? (
        <aside className="comment-buttons">
          <button
            className="primary-button delete-comment-button"
            onClick={() => {
              if (window.confirm('¿Estás seguro?')) deleteComment();
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
