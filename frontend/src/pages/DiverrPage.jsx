import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentsList from '../components/CommentsList';
import DiverrCard from '../components/DiverrCard';
import NewComment from '../components/NewComment';
import { getAllDiverrComments } from '../services/diverrService';

const DiverrPage = () => {
  const { id } = useParams();
  //tendría que hacer un effect con useComments?
  //   const {comments,loading, error, addComment, removeComment}= useComments()
  // useEffect(() => {
  //   const loadData = async () => {
  //     const data = await getAllDiverrComments(id);
  //     console.log(data);
  //   };
  //   loadData();
  // });
  return (
    <section>
      {/* <DiverrCard/> */}
      {/* <CommentsList comments={comments} removeComment={removeComment} /> */}
      {/* <NewComment addComment={addComment}/> */}
    </section>
  );
};
export default DiverrPage;
