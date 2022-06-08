import ErrorMessage from '../components/ErrorMessage';
import DiverrsList from '../components/DiverrsList';
import useDiverrs from '../hooks/useDiverr';
import { useContext } from 'react';
import { QueryContext } from '../context/QueryContext';

const HomePage = () => {
  const { result, error, loading } = useContext(QueryContext);
  //Si sigue cargando devuelvo párrafo
  if (loading) return <p>cargando diverrs...</p>;
  //Si hay error devuelvo mensaje
  if (error) return <ErrorMessage message={error.message} />;
  //Si se cargaron los diverrs cargo la lista de tweets
  return (
    <section>
      <DiverrsList diverrs={result} />
    </section>
  );
};
export default HomePage;
