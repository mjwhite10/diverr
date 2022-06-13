import Comment from "../Comment"
import "./style.css"

const CommentsList = ({comments, deleteComment, editComment}) =>{
    return comments.length ? (
        <ul>
            {comments.map(comment =>(
                <li key={comment.id}>
                   <Comment></Comment>
                </li>
            ))}
           
        </ul>
    ) : (
        <p>Aún no hay comentarios</p>
    )
}


export default CommentsList