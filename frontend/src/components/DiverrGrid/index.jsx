import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './style.css';

const DiverrGrid = ({ diverr }) => {
  const { user } = useContext(AuthContext);
  return (
    <section className="diverr-grid">
      <article>
        <h3>{diverr.title}</h3>
        <img
          src={`${process.env.REACT_APP_BACKEND}/uploads/covers/${diverr.picture}`}
          alt={diverr.title}
          style={{ objectFit: 'cover', width: '16rem', borderRadius: '6px' }}
        ></img>

        <p>{diverr.info}</p>
        <figure>
          <img
            src={
              user.avatar
                ? `${process.env.REACT_APP_BACKEND}/uploads/avatar/${user.avatar}`
                : '../../images/logo-diverr2.svg'
            }
            alt="User"
            className=""
          />
          <h3>{user.name}</h3>
        </figure>
      </article>
    </section>
  );
};

export default DiverrGrid;
