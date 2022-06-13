import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../Auth";

const Comment = ({ comment, editComment, removeComment }) => {
  const [error, setError] = useState("");
  const [send, setSend] = useState(false);
  const { token } = useContext(Auth);

  const handleForm = async e => {
    e.preventDefault();
    try {
      setSend(true);

      //const data?
      //Aquí la petición del envío del comentario
    } catch (error) {
    } finally {
      setSend(false);
    }
  };

  return (
    <form onSubmit={handleForm}>
      <h1>Nuevo comentario</h1>
      <fieldset>
        <label htmlFor='text'>Texto</label>
        <input type='text' id='text' name='text' required></input>
      </fieldset>
      <button>Publicar comentario</button>
      {send ? <p>Publicando comentario</p> : null}
      {error ? <p>{error}</p> : null}
    </form>
  );
};

export default Comment;
