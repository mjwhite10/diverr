import DiverrCard from './DiverrCard';

const DiverrsList = ({ diverrs }) => {
  return (
    <ul className="diverrList">
      {diverrs.map((d) => {
        return (
          <li key={d.id}>
            <DiverrCard diverr={d} />
          </li>
        );
      })}
    </ul>
  );
};
export default DiverrsList;
