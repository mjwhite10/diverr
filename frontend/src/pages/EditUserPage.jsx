import LoadAvatar from "../components/LoadAvatar";

const EditUserPage = () => {
  return (
    <section className="form-page">
      <form className="form">
        <h1>Editar usuario</h1>
        <label htmlFor="nombre">Nombre</label>
        <input
          className="input-field-form"
          id={"nombre"}
          placeholder={""}
          type={"text"}
        />
        <label htmlFor="apellido">Apellido</label>
        <input
          className="input-field-form"
          id={"apellido"}
          placeholder={""}
          type={"text"}
        />
        <label htmlFor="edad">Edad</label>
        <input
          className="input-field-form"
          id={"edad"}
          placeholder={""}
          type={"number"}
        />
        <label htmlFor="sector">Sector</label>
        <input
          className="input-field-form"
          id={"sector"}
          placeholder={""}
          type={"text"}
        />
        <button className="form-button primary-button" type='submit'>Confirmar cambios</button>
      </form>
      <LoadAvatar />
    </section>
  );
};

export default EditUserPage;
