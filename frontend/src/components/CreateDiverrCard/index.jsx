import { useNavigate } from 'react-router-dom';
import './style.css';

const CreateDiverrCard = () => {
  const navigate = useNavigate();
  return (
    <article
      className="create-diverr-card"
      onClick={(e) => {
        navigate('/create/');
      }}
    >
      <p id="create-diverr-card-icon">+</p>
      <p>Crear diverr</p>
    </article>
  );
};
export default CreateDiverrCard;
