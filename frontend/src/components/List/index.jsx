import './style.css';

const List = ({ data, render }) => {
  return <ul>{data.map(render)}</ul>;
};
export default List;
