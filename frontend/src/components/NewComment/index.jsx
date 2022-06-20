import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { sendDiverrCommentService } from '../../services/diverrService';
import './style.css';

const NewComment = ({ addCommentToList, id, solution }) => {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [value, setValue] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      const data = new FormData(e.target);
      const comment = await sendDiverrCommentService(id, data, token);
      addCommentToList(comment);
      setValue('');
      setError('');
    } catch (error) {
      setError('El contenido del mensaje no puede exceder los 280 caracteres');
    } finally {
      setSending(false);
    }
  };

  if (!solution) {
    return (
      <form onSubmit={handleForm} className="new-comment-form">
        <label htmlFor="text">Nuevo comentario</label>
        <textarea
          style={{ resize: 'none' }}
          className="textarea-comment"
          type="text"
          id="content"
          name="content"
          required
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></textarea>
        <button className="primary-button form-button">Publicar</button>
        {sending ? <p>Sending...</p> : null}
        {error ? <p>❌{error}</p> : null}
      </form>
    );
  }
};

export default NewComment;
