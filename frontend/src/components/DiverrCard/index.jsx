import CardSticker from '../CardStiker';
import './style.css';
const DiverrCard = ({ diverr }) => {
  return (
    <article className="diverrCard">
      <img
        src={`${process.env.REACT_APP_BACKEND}/uploads/covers/${diverr.picture}`}
        alt={diverr.title}
      ></img>
      <CardSticker>{diverr.price} €</CardSticker>
      <p>{diverr.title}</p>
      <b>{diverr.category}</b>
      <p>{new Date(diverr.createdAt).toLocaleString()}</p>
    </article>
  );
};
export default DiverrCard;
