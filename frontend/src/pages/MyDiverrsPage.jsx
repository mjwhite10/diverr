import CreateDiverrCard from '../components/CreateDiverrCard';
import DiverrCard from '../components/DiverrCard';
import DiverrList from '../components/List';
import useMyDiverrs from '../hooks/useMyDiverrs';
import useMyDiverrsAsigned from '../hooks/useMyDiverrsAsigned';

const MyDiverrsPage = () => {
  const { myDiverrs, loading, error } = useMyDiverrs();
  const { myAssignedDiverrs } = useMyDiverrsAsigned();
  console.log('My Diverrs', myDiverrs);
  console.log('Asigned', myAssignedDiverrs);
  return (
    <section className="mydiverrs-page">
      <article>
        <h2>Mis Diverrs</h2>
        <DiverrList
          data={myDiverrs}
          render={(diverr) => {
            return (
              <li key={diverr.id}>
                <DiverrCard diverr={diverr} />
              </li>
            );
          }}
        />
      </article>
      <article>
        <h2>Diverrs asignados</h2>
        <DiverrList
          data={myAssignedDiverrs}
          render={(diverr) => {
            return (
              <li key={diverr.id}>
                <DiverrCard diverr={diverr} />
              </li>
            );
          }}
        />
      </article>
    </section>
  );
};
export default MyDiverrsPage;
