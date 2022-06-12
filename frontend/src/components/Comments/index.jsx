import "./style.css"

const Comments = ({comments, deleteComments}) =>{
    return comments.length ? (
        <ul>
            {comments.map(comment =>(
                <li key={comment.id}>
                   <p>Hola, soy un comentario</p> 
                </li>
            ))}
           
        </ul>
    ) : (
        <p>Aún no hay comentarios</p>
    )
}


export default Comments