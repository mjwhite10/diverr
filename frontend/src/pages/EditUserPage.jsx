const EditUserPage = () => {
  return (
    <section className="editUser-page">
      <form className="editUser-form">
        <h1>Editar usuario</h1>
        <label htmlFor="nombre">Nombre</label>
        <editUserForm
          className="inputField"
          id={"nombre"}
          placeholder={""}
          type={"text"}
        />
        <label htmlFor="apellido">Apellido</label>
        <editUserForm
          className="inputField"
          id={"apellido"}
          placeholder={""}
          type={"text"}
        />
        <label htmlFor="edad">Edad</label>
        <editUserForm
          className="inputField"
          id={"edad"}
          placeholder={""}
          type={"number"}
        />
        <label htmlFor="sector">Sector</label>
        <editUserForm
          className="inputField"
          id={"sector"}
          placeholder={""}
          type={"text"}
        />
        <button type='submit'>Confirmar cambios</button>
      </form>
    </section>
  );
};

export default EditUserPage;
