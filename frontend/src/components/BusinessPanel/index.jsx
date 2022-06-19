import './style.css';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const BusinessPanel = ({ diverr, solution }) => {
  const { user } = useContext(AuthContext);

  //Si el usuario que visualiza la pantalla no inició sesión...
  if (!user) return null;

  //Si no hay solución y el usuario que visualiza la pantalla
  //es el mismo que publica el diver
  if (solution.length === 0 && user.id === diverr.idUser) {
    return null;
  }

  //Si no hay solución y el usuario que visualiza la pantalla
  // NO es el mismo que publica el diver
  if (solution.length === 0 && user.id !== diverr.idUser)
    return (
      <section className="business-panel">
        <h3>Control panel</h3>
        <article>
          <p className="price-text">{diverr.price}€</p>
          <button className="primary-button ">Aceptar</button>
        </article>
      </section>
    );
  //Si hay solución y el usuario que visualiza la pantalla
  //es el que acepta solucionar la necesidad
  if (solution && user.id === solution.idUser)
    return (
      <section className="business-panel">
        <h3>Panel de control</h3>
        <form className="form-upload-solution">
          <label className="custom-file-upload">
            <input type="file" />
            Subir archivo
          </label>

          {solution.file && (
            <button type="submit" className="primary-button">
              Marcar como finalizado
            </button>
          )}
          <button className="primary-button">Cancelar solución</button>
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
          <a
            href={`${process.env.REACT_APP_BACKEND}/uploads/solutions/${solution.file}`}
          >
            Descargar fichero
          </a>
          {solution.file && <button className="primary-button">Validar</button>}
        </article>
      </section>
    );
};

export default BusinessPanel;
