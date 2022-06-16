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
        src={`${process.env.REACT_APP_BACKEND}/uploads/covers/${diverr.picture}`}
        alt={diverr.title}
      ></img>
      {showPrice ? <CardSticker>{diverr.price} €</CardSticker> : null}
      <p>{diverr.title}</p>
      {/* <p>
        <b>{diverr.category}</b>
      </p> */}

      {/* <p>{new Date(diverr.createdAt).toLocaleString()}</p> */}
    </article>
  );
};
export default DiverrCard;
