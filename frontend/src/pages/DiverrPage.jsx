import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import List from '../components/List';
import Comment from '../components/Comment';
import NewComment from '../components/NewComment';
import { AuthContext } from '../context/AuthContext';
import useComments from '../hooks/useComments';
import BusinessPanel from '../components/BusinessPanel';

const DiverrPage = ({diverr}) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const { comments, loading, error, addComment, removeComment } = useComments({
    id,
  });

  if (loading) return <p>cargando comentarios...</p>;
  if (error) return <p>{error}</p>;

  console.log(comments);

  return (
    <section className="diverr-page">
      {/*Sería DiverrGrid */}
      <BusinessPanel diverr={diverr}/>
      <List
        data={comments}
        render={(comment) => {
          return (
            <li key={comment.id}>
              <Comment comment={comment} removeComment={removeComment} />
            </li>
          );
        }}
      />
     
      {user ? <NewComment /> : null}
    </section>
  );
};
export default DiverrPage;
