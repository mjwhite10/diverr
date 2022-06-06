const path = require('path');
const { getUserById, getUserByEmail, editUserById } = require('../../db/users');
const {
  generateError,
  createPathIfNotExits,
  processAndSaveImage,
  deleteFile,
} = require('../../helpers');
const {
  editUserSchema,
  idUserSchema,
} = require('../../validators/userValidators');

const editUser = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const { email, name, bio } = req.body;

    //Validamos los parámetros
    await idUserSchema.validateAsync(req.params);
    //Validamos el body
    await editUserSchema.validateAsync(req.body);

    //Comprobamos que el id del usuario que queremos modificar es
    // el mismo que firma la petición o bien es un admin
    if (req.auth.id !== Number(idUser) && req.auth.role !== 'admin')
      throw generateError(
        'No estas autorizado para modificar este usuario',
        403
      );

    //Comprobamos que el usuario existe
    const user = await getUserById(idUser);

    //Comprobamos que si cambió de email, el nuevo no exista en BBDD
    if (email !== user.email) {
      const existingEmailUser = await getUserByEmail(email);

      //Si la consulta devulve al menos un usuario lanzamos error
      if (existingEmailUser)
        throw generateError('Ya existe un usuario con ese email', 403);
    }

    //Comprobamos si se envió una imagen para guardar
    let avatarFileName;
    if (req.files?.avatar) {
      try {
        const uploadPath = path.join(__dirname, '../../uploads/avatar');
        //Creo el path de uploads si no existe
        await createPathIfNotExits(uploadPath);
        // Procesar y guardar imagen
        avatarFileName = await processAndSaveImage(
          req.files.avatar.data,
          uploadPath
        );

        //Si ya tenia guardado otro avatar lo eliminamos
        if (user.avatar) await deleteFile(path.join(uploadPath, user.avatar));
      } catch (error) {
        console.log(error.message);
        throw generateError(
          'No se pudo procesar la imagen. Inténtalo de nuevo',
          400
        );
      }
    } else {
      avatarFileName = user.avatar;
    }

    //Modificamos los datos del usuario
    await editUserById(email, name, bio, avatarFileName, idUser);

    res.send({
      status: 'Ok',
      message: `El usuario con id: ${idUser} ha sido actualizado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { editUser };
