import LoadAvatar from '../components/LoadAvatar';
import InputFieldForm from '../components/InputFieldForm';
const EditUserPage = () => {
  return (
    <section className="edit-user-page">
      <form className="form form-edit">
        <h1>Editar usuario</h1>
        <legend className="legend1">
          <label htmlFor="nombre">Nombre</label>
          <InputFieldForm id={'nombre'} type={'text'} />
          <label htmlFor="apellido">Apellido</label>
          <InputFieldForm id={'apellido'} type={'text'} />
          <label htmlFor="edad">Edad</label>
          <InputFieldForm id={'edad'} type={'text'} />
          <label htmlFor="sector">Sector</label>
          <InputFieldForm id={'sector'} type={'text'} />
        </legend>
        <legend className="legend2">
          <LoadAvatar />
        </legend>

        <button className="form-button primary-button" type="submit">
          Confirmar cambios
        </button>
      </form>
    </section>
  );
};

export default EditUserPage;
