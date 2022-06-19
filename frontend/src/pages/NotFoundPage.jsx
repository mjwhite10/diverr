import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className='error-page'>
      <h1>Page not found</h1>
      <img  className='error-page-gif' src="../images/error.gif" alt="error cat" />
      <Link to={'/'}>Go to Home Page</Link>
    </section>
  );
};

export default NotFoundPage;
