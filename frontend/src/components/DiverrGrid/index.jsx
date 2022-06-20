import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './style.css';

const DiverrGrid = ({ diverr }) => {
  const { user } = useContext(AuthContext);
  return (
    <section className="diverr-grid">
      <article>
        <h1>{diverr.title}</h1>
        <p className="category-sticker">{diverr.category}</p>

        <img
          src={
            diverr?.picture
              ? `${process.env.REACT_APP_BACKEND}/uploads/covers/${diverr.picture}`
              : '../../../images/logo-diverr2.svg'
          }
          alt={diverr?.title}
        ></img>

        <p>{diverr.info}</p>
        <figure>
          <img
            src={
              user?.avatar
                ? `${process.env.REACT_APP_BACKEND}/uploads/avatar/${diverr?.avatar}`
                : '../../images/logo-diverr2.svg'
            }
            alt="User"
            className=""
          />
          <h3>{diverr?.user}</h3>
        </figure>
      </article>
    </section>
  );
};

export default DiverrGrid;
