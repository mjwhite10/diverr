import { useState } from 'react';

const LoadAvatar = () => {
    const [image, setImage] = useState('');
    return (
    <input
    type="file"
    id="image"
    name="image"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
    />
    );
  };
  
  export default LoadAvatar;