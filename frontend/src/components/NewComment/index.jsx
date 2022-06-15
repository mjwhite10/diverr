import { useState } from "react"
import "./style.css"

//addComment vendría del effect de useComment

const NewComment=({addComment})=>{
const [error,setError]=useState("");
const [sending,setSending]=useState(false)

const handleForm= e=>{
    e.preventDefault()

    try {
setSending(true)
        // const comment = await funcion peticion enviar comentario (con token )
        //addComment(comment)
    } catch (error) {
        setError(error.message)
    }finally{
        setSending(false)
    }
}


    return(
        <form onSubmit={handleForm} className="form" >
                <label htmlFor="text" >Nuevo comentario</label>
                <textarea className="textarea-comment" type="text" id="text" name="comment" required ></textarea>
            <button className="primary-button">Publicar</button>
            {error ? <p>{error}</p> : null}
        </form>
    )
}

export default NewComment