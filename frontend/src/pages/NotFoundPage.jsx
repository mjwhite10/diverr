import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = ({ hideItems }) => {
  useEffect(() => {
    hideItems(true);
  });
  return (
    <section>
      <h1>Not Found</h1>
      <Link to={'/'}>Go to Home Page</Link>
    </section>
  );
};

export default NotFoundPage;
