import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./style.css";

const DiverrGrid = (diverr, comment) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  return (
    <div className="diverr-grid">
      <section className="diver-grid-image">
        <h1>Lorem ipsum</h1>
        <img
          src={`${process.env.REACT_APP_BACKEND}/uploads/covers/${diverr.picture}`}
          alt={diverr.title}
        ></img>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          voluptate sit quod non.
        </p>
      </section>
      <section className="diverr-grid-comment">
        <figure>
          <img
            src={
              comment.avatar
                ? `${process.env.REACT_APP_BACKEND}/uploads/avatar/${comment.avatar}`
                : "../../images/logo-diverr2.svg"
            }
            alt="User"
            className="comment-header-avatar"
          />
        </figure>
        <article className="diverr-grid-comment-text">
          <h3>{comment.user}</h3>
          <p className="comment-content">{comment.content}</p>
          <p className="comment-date">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </article>
      </section>
    </div>
  );
};

export default DiverrGrid;
