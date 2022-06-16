import CreateDiverrCard from '../CreateDiverrCard';
import DiverrCard from '../DiverrCard';
import './style.css';

const MyDiverrsList = ({ diverrs }) => {
  return (
    <ul>
      <li>
        <CreateDiverrCard className="create-diverr-card" />
      </li>
      {diverrs.map((diverr) => {
        return (
          <li key={diverr.id}>
            <DiverrCard diverr={diverr} showPrice={false} />
          </li>
        );
      })}
    </ul>
  );
};
export default MyDiverrsList;
