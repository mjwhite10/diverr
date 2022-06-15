import { useContext } from "react";
import { useParams } from "react-router-dom";
import CommentsList from "../components/CommentsList";
import DiverrCard from "../components/DiverrCard";
import NewComment from "../components/NewComment";
import { AuthContext } from "../context/AuthContext";
import useComments from "../hooks/useComments";

const DiverrPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const { comments, loading, error, addComment, removeComment } = useComments({
    id,
  });

  if (loading) return <p>cargando comentarios...</p>;
  if (error) return <p>{error}</p>;

  console.log(comments);

  return (
    <section className='diverr-page'>
      {/*Sería DiverrGrid */}
      {/* <DiverrCard diverr={id} /> */}
      <CommentsList
        comments={comments}
        addComment={addComment}
        removeComment={removeComment}
      />
      {user ? <NewComment /> : null}
    </section>
  );
};
export default DiverrPage;
