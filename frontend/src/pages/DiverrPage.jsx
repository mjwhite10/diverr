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
import { useState } from 'react';
import { useEffect } from 'react';

const DiverrPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  //Esta variable de estado se usa para ocultar o mostar los botones
  //de delete y edit de los comentarios o para visualizar el panel de
  //añadir comentarios
  const [allowComments, setAllowComments] = useState(true);

  //Diverr
  const {
    diverr: diverrData,
    loading: loadingDiverrData,
    error: errorDiverrData,
  } = useDiverr({ id });
  //Solution
  //No recogemos el error ya que nos interesa que haya error cuando no hay solución
  //Se puede modificar el backend para consultar si un diverr tiene o no solucion
  const { solution, loading: loadingDiverrSolution } = useDiverrSolution({
    id,
  });
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

  useEffect(() => {
    setAllowComments(solution.length === 0);
  }, [solution?.length]);

  return (
    <section className="diverr-page">
      {loadingDiverrData ? (
        <p>Cargando info...</p>
      ) : (
        <DiverrGrid diverr={diverrData} />
      )}
      {errorDiverrData && <p>❌{errorDiverrData}</p>}

      {loadingDiverrSolution ? (
        <p>Cargando solucion...</p>
      ) : (
        <BusinessPanel diverr={diverrData} solution={solution} />
      )}

      {user && (
        <NewComment
          addCommentToList={addComment}
          id={id}
          allowComments={allowComments}
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
                  allowComments={allowComments}
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
