import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import List from '../components/List';
import Comment from '../components/Comment';
import NewComment from '../components/NewComment';
import { AuthContext } from '../context/AuthContext';
import useComments from '../hooks/useComments';
import BusinessPanel from '../components/BusinessPanel';
import DiverrGrid from '../components/DiverrGrid';
import useDiverr from '../hooks/useDiverr';
import useDiverrSolution from '../hooks/useDiverrSolution';

const DiverrPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const {
    diverr: diverrData,
    loading: loadingDiverrData,
    error: errorDiverrData,
  } = useDiverr({ id });

  const {
    solution,
    loading: loadingDiverrSolution,
    error: errorDiverrSolution,
  } = useDiverrSolution({ id });

  const { comments, loading, error, addComment, editComment, removeComment } =
    useComments({
      id,
    });

  if (loading) return <p>cargando comentarios...</p>;
  if (errorDiverrData) return <p>{errorDiverrData}</p>;
  return (
    <section className="diverr-page">
      <DiverrGrid diverr={diverrData} />
      <BusinessPanel diverr={diverrData} solution={solution} />
      {user ? <NewComment addCommentToList={addComment} id={id} /> : null}
      <List
        data={comments}
        render={(comment) => {
          return (
            <li key={comment.id}>
              <Comment
                comment={comment}
                correctComment={editComment}
                removeComment={removeComment}
              />
            </li>
          );
        }}
      />
    </section>
  );
};
export default DiverrPage;
