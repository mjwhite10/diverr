import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputFieldForm from '../components/InputFieldForm';
import { AuthContext } from '../context/AuthContext';
import { QueryContext } from '../context/QueryContext';
import useCategories from '../hooks/useCategories';
import { createDiverrService } from '../services/diverrService';

const NewDiverrPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { updateData } = useContext(QueryContext);
  const { categories } = useCategories();
  const [title, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [price, setPrice] = useState('');
  const [errorPrice, setErrorPrice] = useState('');
  const [info, setInfo] = useState('');
  const [errorInfo, setErrorInfo] = useState('');
  const [category, setCategory] = useState(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('title', title);
      data.append('info', info);
      data.append('price', price);
      data.append('category', category ? category : categories[0].description);
      if (file) data.append('file', file);
      if (image) data.append('picture', image);

      await createDiverrService(data, token);

      setTitle('');
      setInfo('');
      setPrice('');
      setImage(null);
      setFile(null);

      await updateData();
      navigate('/');
    } catch (error) {
      if (error.message.includes('title')) setErrorTitle(error.message);
      if (error.message.includes('info')) setErrorInfo(error.message);
      if (error.message.includes('price')) setErrorPrice(error.message);
    }

    //Aquí peticiones
  };

  return (
    <section className="newdiverr-page">
      <form className="newdiverr-form form" onSubmit={handleForm}>
        <h1 className="h1-newdiverr">Crear diverr</h1>
        <label htmlFor="title">Título: </label>
        <InputFieldForm
          className="newdiverr-input"
          type={'text'}
          id={'title'}
          name={'title'}
          autofocus={true}
          setValue={setTitle}
          value={title}
          setError={setErrorTitle}
          error={errorTitle}
        ></InputFieldForm>

        <label htmlFor="info">Info:</label>
        <InputFieldForm
          className="newdiverr-input"
          type={'text'}
          id={'info'}
          name={'info'}
          setValue={setInfo}
          value={info}
          setError={setErrorInfo}
          error={errorInfo}
        ></InputFieldForm>
        <label htmlFor="category">Category: </label>
        <select
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => {
            return (
              <option key={c.id} value={c.description}>
                {c.description}
              </option>
            );
          })}
        </select>
        <label htmlFor="price">Precio: </label>
        <InputFieldForm
          className="newdiverr-input"
          type={'text'}
          id={'price'}
          name={'price'}
          setValue={setPrice}
          value={price}
          setError={setErrorPrice}
          error={errorPrice}
        ></InputFieldForm>
        <label>Archivo:</label>
        <label className="file-upload">
          <input
            className="input-file"
            type="file"
            id="avatar"
            name="avatar"
            onChange={(e) => setFile(e.target.files[0])}
            value=""
          />
          {file ? file.name : 'Subir Archivo'}
        </label>
        <label>Portada:</label>
        <label className="image-upload">
          {image ? (
            <figure>
              <img
                src={URL.createObjectURL(image)}
                alt="Previsualización"
                style={{ width: '150px', borderRadius: '4px' }}
              />{' '}
            </figure>
          ) : null}
          <input
            className="input-file"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            value=""
          />
          {image ? image.name : 'Subir imagen'}
        </label>

        <button className="primary-button form-button">Crear</button>
      </form>
    </section>
  );
};
export default NewDiverrPage;
