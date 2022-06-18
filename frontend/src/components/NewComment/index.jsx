import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { sendDiverrCommentService } from '../../services/diverrService';
import './style.css';

const NewComment = ({ addCommentToList, id }) => {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      const data = new FormData(e.target);

      const comment = await sendDiverrCommentService(id, data, token);
      console.log(comment);
      addCommentToList(comment);
      e.target.reset();
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleForm} className="new-comment-form">
      <label htmlFor="text">Nuevo comentario</label>
      <textarea
        className="textarea-comment"
        type="text"
        id="content"
        name="content"
        required
      ></textarea>
      <button className="primary-button">Publicar</button>
      {sending ? <p>Sending...</p> : null}
      {error ? <p>❌{error}</p> : null}
    </form>
  );
};

export default NewComment;
