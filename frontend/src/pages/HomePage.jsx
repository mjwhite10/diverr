import List from '../components/List';
import useDiverrs from '../hooks/useDiverr';

const HomePage = () => {
  const { loading, diverrs, error } = useDiverrs();
  //Si sigue cargando devuelvo párrafo
  if (loading) return <p>cargando tweets...</p>;
  //Si hay error devuelvo mensaje
  if (error) return <p>{error}</p>;
  //Si se cargaron los diverrs cargo la lista de tweets
  return (
    <section>
      <List diverrs={diverrs} />
    </section>
  );
};
export default HomePage;
