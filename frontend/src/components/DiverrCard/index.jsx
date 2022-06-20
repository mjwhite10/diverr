import { useNavigate } from 'react-router-dom';
import CardSticker from '../CardStiker';
import './style.css';
const DiverrCard = ({ diverr, showPrice = true }) => {
  const navigate = useNavigate();
  return (
    <article
      className="diverrCard"
      onClick={(e) => navigate(`/diverr/${diverr.id}`)}
    >
      <img
        src={
          diverr.picture
            ? `${process.env.REACT_APP_BACKEND}/uploads/covers/${diverr.picture}`
            : '../../../images/logo-diverr2.svg'
        }
        alt={diverr?.title}
      ></img>
      {showPrice ? <CardSticker>{diverr.price} €</CardSticker> : null}
      <p>{diverr.title}</p>
    </article>
  );
};
export default DiverrCard;
