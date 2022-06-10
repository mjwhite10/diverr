import { useEffect } from 'react';

const EditUserPage = ({ hideItems }) => {
  useEffect(() => {
    hideItems(true);
  });
  return <p>Welcome to edit user page</p>;
};
export default EditUserPage;
