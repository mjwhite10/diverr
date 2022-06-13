import CommentsList from "../components/CommentsList";
import DiverrCard from "../components/DiverrCard"
import NewComment from "../components/NewComment";

const DiverrPage = () => {

//tendría que hacer un effect con useComments?
//   const {comments,loading, error, addComment, removeComment}= useComments()


  return (<section>
     <DiverrCard/>
   {/* <CommentsList comments={comments} removeComment={removeComment} /> */}
   {/* <NewComment addComment={addComment}/> */}
    </section>
   )
};
export default DiverrPage;
