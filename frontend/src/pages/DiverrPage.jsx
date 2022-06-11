import { useEffect } from 'react';

const DiverrPage = ({ hideItems }) => {
  useEffect(() => {
    hideItems(true);
  });
  return <p>Welcome to diverr page</p>;
};
export default DiverrPage;
