import CreateDiverrCard from '../components/CreateDiverrCard';
import DiverrCard from '../components/DiverrCard';
import List from '../components/List';
import MyDiverrsList from '../components/MyDiverrsList';
import useMyDiverrs from '../hooks/useMyDiverrs';
import useMyDiverrsAsigned from '../hooks/useMyDiverrsAsigned';

const MyDiverrsPage = () => {
  const { myDiverrs, loading, error } = useMyDiverrs();
  const { myAssignedDiverrs } = useMyDiverrsAsigned();

  return (
    <section className="mydiverrs-page">
      <article>
        <h2>Mis Diverrs</h2>
        <MyDiverrsList diverrs={myDiverrs} />
      </article>
      <article>
        <h2>Diverrs asignados</h2>
        <List
          data={myAssignedDiverrs}
          render={(diverr) => {
            return (
              <li key={diverr.id}>
                <DiverrCard diverr={diverr} showPrice={false} />
              </li>
            );
          }}
        />
      </article>
    </section>
  );
};
export default MyDiverrsPage;
