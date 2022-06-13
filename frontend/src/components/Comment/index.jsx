import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Auth from "../Auth";

const Comment = ({ comment, removeComment }) => {
  const { user, token } = useContext(Auth);
  const [error, setError] = useState("");

  const deleteComment = async id => {
    try {
      // await funcion borrar comentario
      removeComment(id);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article>
      <p>{comment.text}</p>
      <p>
        {" "}
        <Link to={`/user/${user.id}`}>Por {comment.name}</Link> el{" "}
        {new Date(comment.createdAt).toLocaleString()}
      </p>
      {user && user.id === comment.user_id ? (
        <section>
          <button
            onClick={() => {
              if (window.confirm("¿Estás seguro")) deleteComment(comment.id);
            }}
          >
            Borrar comentario
          </button>
          {error ? <p>{error}</p> : null}
        </section>
      ) : null}
    </article>
  );
};

export default Comment;
