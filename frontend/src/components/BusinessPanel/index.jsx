import './style.css';
import { useState } from 'react';
import InputFieldForm from '../InputFieldForm';
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

  const handleFile = (e) => {};
  if (true || (assigned && user.id === diverr.idUser)) {
    return (
      <section className="business-panel">
        <article>
          <a href="">Descargar fichero</a>
        </article>
      </section>
    );
  }

  if (!assigned)
    return (
      <section className="business-panel">
        <article>
          <p className="price-text">{diverr.price}€</p>

          <button className="accept-button primary-button ">Aceptar</button>
        </article>
      </section>
    );
};

export default BusinessPanel;
