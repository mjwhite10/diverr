import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="error-page">
      <h1>La página no existe</h1>
      <img
        className="error-page-gif"
        src="../../../images/error.gif"
        alt="error cat"
      />
      <Link className="link" to={'/'}>
        Descuida, Gatete te llevará a la Home Page
      </Link>
    </section>
  );
};

export default NotFoundPage;
