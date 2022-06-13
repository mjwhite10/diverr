import Comment from "../Comment"
import "./style.css"

const CommentsList = ({comments, removeComment, editComment}) =>{
    return comments.length ? (
        <ul>
            {comments.map(comment =>(
                <li key={comment.id}>
                  <Comment comment={comment} removeComment={removeComment} />
                </li>
            ))}
           
        </ul>
    ) : (
        <p>Aún no hay comentarios</p>
    )
}


export default CommentsList