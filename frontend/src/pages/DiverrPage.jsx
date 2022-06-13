import CommentsList from "../components/CommentsList";
import DiverrCard from "../components/DiverrCard"
import NewComment from "../components/NewComment";

const DiverrPage = ({diverr}) => {

//tendría que hacer un effect con useComments?
//   const {comments,loading, error, addComment, removeComment}= useComments()


  return (<section>
     <DiverrCard diverr={diverr} />
   {/* <CommentsList comments={comments} removeComment={removeComment} /> */}
   {/* <NewComment addComment={addComment}/> */}
    </section>
   )

};
export default DiverrPage;
