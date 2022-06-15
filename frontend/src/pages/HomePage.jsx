import ErrorMessage from '../components/ErrorMessage';
import List from '../components/List';
import { useContext } from 'react';
import { QueryContext } from '../context/QueryContext';
import DiverrCard from '../components/DiverrCard';

const HomePage = () => {
  const { result, error, loading } = useContext(QueryContext);
  //Si sigue cargando devuelvo párrafo
  if (loading) return <p>cargando diverrs...</p>;
  //Si hay error devuelvo mensaje
  if (error) return <ErrorMessage message={error.message} />;
  //Si se cargaron los diverrs cargo la lista de tweets

  return (
    <section className="home-page">
      <List
        data={result}
        render={(d) => {
          return (
            <li key={d.id}>
              <DiverrCard diverr={d} />
            </li>
          );
        }}
      />
    </section>
  );
};
export default HomePage;
