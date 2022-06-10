import './style.css';
const DiverrCard = ({ diverr }) => {
  return (
    <article className="diverrCard">
      <img
        src={`${process.env.REACT_APP_BACKEND}/uploads/covers/${diverr.picture}`}
        alt={diverr.title}
      ></img>
      <p>{diverr.title}</p>
      <p>{diverr.category}</p>
      <p>{new Date(diverr.createdAt).toLocaleString()}</p>
      <p>{diverr.price}</p>
    </article>
  );
};
export default DiverrCard;
