import "./style.css";
import { useState } from "react";
import InputFieldForm from "../InputFieldForm";

const BusinessPanel = () => {
  const [accepted, setAccepted] = useState(false);
  const [file, setFile] = useState("");

  const handleOnClick = e => {
    e.preventDefault();
    setAccepted(true);

// if (user.id === diverr.userId){
//   throw new Error("El usuario que creó el diverr no puede resolverlo")
// }

  };

  const handleFile = e => {
    setFile(e.target.files[0]);
  };

  return (
    <article>
      <p>700 €</p>
      {accepted === false ? <p>Sin asignar</p> : <p>Aceptada</p>}
      {accepted === false ? (
        <button className='' type='submit' onClick={handleOnClick}>
          Aceptar
        </button>
      ) : accepted === true && !file ? (
        <InputFieldForm
          className='input-field-form'
          type={"file"}
          id={"file"}
          name={"file"}
          onChange={handleFile}
        />
      ) : (
        <p>Descargar fichero</p>
      )}
      {accepted === false ? null : accepted === true ? (
        <p>Trabajo finalizado</p>
      ) : (
        //aquí no sé como decirle que si hay file que pinte validar
        accepted === true && file(<button>Validar</button>)
      )}
    </article>
  );
};

export default BusinessPanel;
