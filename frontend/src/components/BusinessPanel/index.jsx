import './style.css';
import { useState } from 'react';
import InputFieldForm from '../InputFieldForm';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import useDiverrSolution from '../../hooks/useDiverrSolution';

const BusinessPanel = ({ diverr, solution }) => {
  const { user } = useContext(AuthContext);

  return user ? (
    <section className="business-panel">
      <h4>Control panel</h4>
      {solution.length === 0 && (
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
  ) : null;
};

export default BusinessPanel;
