import './style.css';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  createDiverrSolutionService,
  deleteDiverrService,
  deleteDiverrSolutionService,
  updateDiverrSolutionService,
} from '../../services/diverrService';
import { useNavigate, useParams } from 'react-router-dom';
import { QueryContext } from '../../context/QueryContext';

const BusinessPanel = ({ diverr, solution, loadDiverrSolution }) => {
  const { user, token } = useContext(AuthContext);
  const { updateData } = useContext(QueryContext);
  const { id } = useParams();
  const [error, setError] = useState('');
  const [solutionFile, setSolutionFile] = useState('');
  const navigate = useNavigate();

  /**Función para aceptar un diverr y crear una solucion */
  const onAcceptDiverrClick = async (e) => {
    try {
      await createDiverrSolutionService(id, token);
      await loadDiverrSolution({ id }); //Llamamos a está función para que el resto de componentes se actualicen
      await updateData(); //Llamamos a está función para que en la HomePage se muestre o no este diverr
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  /**Función para cancelar una solución en curso */
  const onCancelSolutionClick = async (e) => {
    try {
      await deleteDiverrSolutionService(id, token);
      await loadDiverrSolution({ id });
      await updateData();
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const onValidateSolutionClick = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('finished', true);
      await updateDiverrSolutionService(id, data, token);
      await loadDiverrSolution({ id });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onHandleFormUploadSolutionFile = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      data.append('finished', false);
      await updateDiverrSolutionService(id, data, token);
      setSolutionFile(null);
      await loadDiverrSolution({ id });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onDeleteDiverrClick = async (e) => {
    try {
      await deleteDiverrService(id, token);
      await updateData();
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  //Si el usuario que visualiza la pantalla no inició sesión...
  if (!user) return null;

  //Si no hay solución y el usuario que visualiza la pantalla
  //es el mismo que publica el diver
  if (!solution && user.id === diverr.idUser) {
    return (
      <section className="business-panel">
        <h3>Control panel</h3>
        <article>
          <button className="primary-button" onClick={onDeleteDiverrClick}>
            Eliminar diverr
          </button>
        </article>
        {error && <p>❌{error}</p>}
      </section>
    );
  }

  //Si no hay solución y el usuario que visualiza la pantalla
  // NO es el mismo que publica el diver
  if (!solution && user.id !== diverr.idUser)
    return (
      <section className="business-panel">
        <h3>Control panel</h3>
        <article>
          <p className="price-text">{diverr.price}€</p>
          <button className="primary-button" onClick={onAcceptDiverrClick}>
            Aceptar
          </button>
        </article>
        {error && <p>❌{error}</p>}
      </section>
    );
  //Si hay solución y el usuario que visualiza la pantalla
  //es el que acepta solucionar la necesidad y, además la solucion
  //no fue marcada como finalizada...
  if (solution && user.id === solution.idUser && !solution.finishedAt)
    return (
      <section className="business-panel">
        <h3>Control panel</h3>
        <form
          className="form-upload-solution"
          onSubmit={onHandleFormUploadSolutionFile}
        >
          {diverr.file && (
            <>
              <label className="label-title">Archivo original:</label>
              <a
                href={`${process.env.REACT_APP_BACKEND}/uploads/diverrs/${diverr.file}`}
              >
                {diverr.file}
              </a>
            </>
          )}
          <label className="label-title"> Solución propuesta:</label>
          <label className="custom-file-upload">
            <input
              type="file"
              name="solutionFile"
              id="solutionFile"
              onChange={(e) => {
                setSolutionFile(e.target.files[0]);
              }}
            />
            {solution.file ? solution.file : 'Añadir archivo'}
          </label>
          {solutionFile && (
            <button type="submit" className="primary-button">
              Subir archivo
            </button>
          )}

          <button className="primary-button" onClick={onCancelSolutionClick}>
            Cancelar solución
          </button>
        </form>
      </section>
    );
  //Si hay solución y el usuario que visualiza la pantalla
  //es el que publica el diver
  if (solution && user.id === diverr.idUser)
    return (
      <section className="business-panel">
        <h3>Panel de control</h3>
        <article className="user-validation">
          {solution.file ? (
            <a
              href={`${process.env.REACT_APP_BACKEND}/uploads/solutions/${solution.file}`}
            >
              Descargar fichero
            </a>
          ) : (
            <p>Aún no se subió ningún archivo</p>
          )}
          {solution.markAsFinished === 0 ? (
            <button
              className="primary-button"
              onClick={onValidateSolutionClick}
            >
              Validar
            </button>
          ) : (
            <p style={{ marginTop: '4rem' }}>
              *Validado el {new Date(solution.finishedAt).toLocaleString()}
            </p>
          )}
        </article>
      </section>
    );
};

export default BusinessPanel;
