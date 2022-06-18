import './style.css';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import useDiverrSolution from '../../hooks/useDiverrSolution';

const BusinessPanel = ({ diverr }) => {
  const [assigned, setAssigned] = useState(false);
  const { user, token } = useContext(AuthContext);
  const [file, setFile] = useState('');
  const { id } = useParams();

  const {
    solution,
    loading: loadingDiverrSolution,
    error: errorDiverrSolution,
  } = useDiverrSolution({ id });

  const handleOnClick = (e) => {
    e.preventDefault();

    // if (user.id === diverr.userId){
    //   throw new Error("El usuario que creó el diverr no puede resolverlo")
    // }
  };
  console.log(user);
  const handleFile = (e) => {};
  return (
    <section className="business-panel">
      <h4>Control panel</h4>
      {!solution && (
        //Si no esta asignado
        <article>
          <p className="price-text">{diverr.price}€</p>
          <button className="accept-button primary-button ">Aceptar</button>
        </article>
      )}
      {solution && user?.id === solution.idUser && (
        <form className="form-upload-solution">
          <label className="custom-file-upload">
            <input type="file" />
            Subir archivo
          </label>

          {solution.file && (
            <button className="primary-button">Marcar como finalizado</button>
          )}
        </form>
      )}
      {solution && user?.id === diverr.idUser && (
        <article className="user-validation">
          <a
            href={`${process.env.REACT_APP_BACKEND}/uploads/solutions/${solution.file}`}
          >
            Descargar fichero
          </a>
          {solution.file && <button className="primary-button">Validar</button>}
        </article>
      )}
    </section>
  );
};

export default BusinessPanel;
