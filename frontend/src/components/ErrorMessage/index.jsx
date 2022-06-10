import { Link } from 'react-router-dom';
import './style.css';

const ErrorMessage = ({ message }) => {
  return (
    <section className="error">
      <h1>Error</h1>
      <p>{message}</p>
      <Link to={'/'}>Go to home</Link>
    </section>
  );
};

export default ErrorMessage;
