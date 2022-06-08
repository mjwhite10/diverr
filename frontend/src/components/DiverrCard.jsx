const DiverrCard = ({ diverr }) => {
  return (
    <article className="diverrCard">
      <h2>{diverr.title}</h2>
      <img
        src={`${process.env.REACT_APP_BACKEND}/uploads/covers/${diverr.picture}`}
        alt={diverr.title}
      ></img>
      <p>{diverr.info}</p>
    </article>
  );
};
export default DiverrCard;
