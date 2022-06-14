import { useState } from "react";
import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Comment = ({ comment, removeComment, correctComment }) => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");

  console.log(user);
  console.log(comment);

  const deleteComment = async id => {
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

  const editComment = async id => {
    try {
      //await funcion editar comentario
      correctComment(id);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article>
      <p>{comment.text}</p>
      <p>
        <Link to={`/user/${user.id}`}>Por {comment.name}</Link> el{" "}
        {new Date(comment.createdAt).toLocaleString()}
      </p>
      {user && user.id === comment.user_id ? (
        <section>
          <button
            className='primary-button'
            onClick={() => {
              if (window.confirm("¿Estás seguro?")) deleteComment(comment.id);
            }}
          >
            Borrar comentario
          </button>
          <button
            className='primary-button'
            onClick={() => {
              if (window.confirm("¿Estás seguro?")) editComment(comment.id);
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
