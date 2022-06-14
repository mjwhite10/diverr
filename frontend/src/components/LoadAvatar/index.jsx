import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './style.css';
const LoadAvatar = () => {
  const [image, setImage] = useState('');
  const { user } = useContext(AuthContext);

  const getImage = () => {
    return image
      ? URL.createObjectURL(image)
      : user?.avatar
      ? `${process.env.REACT_APP_BACKEND}/uploads/avatar/${user.avatar}`
      : '../../../images/logo-diverr2.svg';
  };
  return (
    <div className="load-avatar">
      <figure>
        <img className="load-avatar-image" src={getImage()} alt="Preview"></img>
      </figure>
      <div className="custom-input-file">
        <input
          className="input-file"
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          value=""
        />
        <i className="edit-button" />
      </div>
    </div>
  );
};

export default LoadAvatar;
