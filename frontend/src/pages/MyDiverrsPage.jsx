import { useEffect } from 'react';

const MyDiverrsPage = ({ hideItems }) => {
  useEffect(() => {
    hideItems(true);
  });
  return <p>Welcome to my diverrs page</p>;
};
export default MyDiverrsPage;
