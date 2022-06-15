import Comment from '../Comment';
import './style.css';

const CommentsList = ({ comments, removeComment, correctComment }) => {
  return comments.length ? (
    <ul >
      <h1>Comentarios</h1>
      {comments.map((comment) => (
        <li key={comment.id} >
          <Comment
            comment={comment}
            removeComment={removeComment}
            correctComment={correctComment}
          />
        </li>
      ))}
    </ul>
  ) : (
    <p>Aún no hay comentarios</p>
  );
};

export default CommentsList;
