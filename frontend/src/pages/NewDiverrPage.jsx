import { useState } from 'react';
import InputFieldForm from '../components/InputFieldForm';

const NewDiverrPage = () => {
  //Habría que  mostrar el avatar y esconder el inicio de sesión y el registro
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [info, setInfo] = useState('');
  const [file, setFile] = useState('');
  const [fileSelected, setFileselected] = useState(false);
  const [image, setImage] = useState('');
  const [imageSelected, setImageselected] = useState(false);

  const handleFile = (e) => {
    setFile(e.target.file);
    setFileselected(true);
  };

  const handleImage = (e) => {
    setImage(e.target.image);
    setImageselected(true);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    //Aquí peticiones
  };

  return (
    <section className="newdiverr-page">
      {/* <SearchBar></SearchBar> */}
      <form className="newdiverr-form" onSubmit={handleForm}>
        <h1 className="h1-newdiverr">Crear diverr</h1>
        <label htmlFor="title">Título *</label>
        <InputFieldForm
          className="newdiverr-input"
          type={'text'}
          id={'title'}
          name={'title'}
          required
          autofocus={true}
          onChange={(e) => setTitle(e.target.value)}
        ></InputFieldForm>
        <label htmlFor="price">Precio *</label>
        <InputFieldForm
          className="newdiverr-input"
          type={'number'}
          id={'price'}
          name={'price'}
          required
          onChange={(e) => setPrice(e.target.value)}
        ></InputFieldForm>
        <label htmlFor="info">Info *</label>
        <InputFieldForm
          className="newdiverr-input"
          type={'text'}
          id={'info'}
          name={'info'}
          required
          onChange={(e) => setInfo(e.target.value)}
        ></InputFieldForm>
        <label>Archivo</label>
        <InputFieldForm
          className="file-upload"
          type={'file'}
          id={'file'}
          name={'file'}
          onChange={handleFile}
        ></InputFieldForm>
        <label>Imagen</label>
        <InputFieldForm
          className="image-upload"
          type={'file'}
          id={'image'}
          name={'image'}
          onChange={handleImage}
        ></InputFieldForm>

        <button className="newdiverr-button">Crear</button>
      </form>
    </section>
  );
};
export default NewDiverrPage;
