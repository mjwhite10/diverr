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
    solution: diverrSolution,
    loading: loadingDiverrSolution,
    updateSolution,
  } = useDiverrSolution({ id });

  //Diverr
  const {
    diverr: diverrData,
    loading: loadingDiverrData,
    error: errorDiverrData,
  } = useDiverr({ id });

  //Commentarios
  const {
    comments,
    loading: loadingDiverrComments,
    error: errorDiverrComments,
    addComment,
    editComment,
    removeComment,
  } = useComments({
    id,
  });

  return (
    <section className="diverr-page">
      {loadingDiverrData ? (
        <p>Cargando info...</p>
      ) : (
        <DiverrGrid diverr={diverrData} />
      )}
      {errorDiverrData && <p>❌{errorDiverrData}</p>}
      <BusinessPanel
        diverr={diverrData}
        solution={diverrSolution}
        loadDiverrSolution={updateSolution}
      />

      {user && (
        <NewComment
          addCommentToList={addComment}
          id={id}
          solution={diverrSolution}
        />
      )}

      {errorDiverrComments && <p>❌{errorDiverrComments}</p>}
      {loadingDiverrComments ? (
        <p>Cargando comentarios</p>
      ) : (
        <List
          data={comments}
          render={(comment) => {
            return (
              <li key={comment.id}>
                <Comment
                  comment={comment}
                  correctComment={editComment}
                  removeComment={removeComment}
                  solution={diverrSolution}
                />
              </li>
            );
          }}
        />
      )}
    </section>
  );
};
export default DiverrPage;
