import LoadAvatar from "../components/LoadAvatar";

const EditUserPage = () => {
  return (
    <section className="login-page">
      <form className="login-form">
        <h1>Editar usuario</h1>
        <label htmlFor="nombre">Nombre</label>
        <input
          className="inputField"
          id={"nombre"}
          placeholder={""}
          type={"text"}
        />
        <label htmlFor="apellido">Apellido</label>
        <input
          className="inputField"
          id={"apellido"}
          placeholder={""}
          type={"text"}
        />
        <label htmlFor="edad">Edad</label>
        <input
          className="inputField"
          id={"edad"}
          placeholder={""}
          type={"number"}
        />
        <label htmlFor="sector">Sector</label>
        <input
          className="inputField"
          id={"sector"}
          placeholder={""}
          type={"text"}
        />
        <button className="login-button primary-button" type='submit'>Confirmar cambios</button>
      </form>
      <LoadAvatar />
    </section>
  );
};

export default EditUserPage;
