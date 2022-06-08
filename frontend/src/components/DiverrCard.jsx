const DiverrCard = ({ diverr }) => {
  return (
    <article className="diverrCard">
      <img
        src={`${process.env.REACT_APP_BACKEND}/uploads/covers/${diverr.picture}`}
        alt={diverr.title}
      ></img>
      <p>{diverr.title}</p>
      <p>{diverr.category}</p>
    </article>
  );
};
export default DiverrCard;
