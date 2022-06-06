const { getUserById, editUserPasswordById } = require('../../db/users');
const { generateError, checkPassword } = require('../../helpers');
const {
  editUserPasswordSchema,
  idUserSchema,
} = require('../../validators/userValidators');

const editUserPassword = async (req, res, next) => {
  try {
    //Validamos los parametros
    await idUserSchema.validateAsync(req.params);
    //Validamos el body
    await editUserPasswordSchema.validateAsync(req.body);

    const { idUser } = req.params;
    const { oldPassword, newPassword } = req.body;

    //Comprobamos que el id del usuario que queremos modificar es
    // el mismo que firma la petición o bien es un admin
    if (req.auth.id !== Number(idUser) && req.auth.role !== 'admin')
      throw generateError(
        'No estas autorizado para modificar este usuario',
        403
      );

    //Comprobamos que el usuario existe
    const user = await getUserById(idUser);

    //Verificamos que la password antigua sea correcta...
    await checkPassword(oldPassword, user.password);

    //Actualizamos la password
    await editUserPasswordById(idUser, newPassword);

    res.send({
      status: 'Ok',
      message: 'La contraseña ha sido actualizada',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { editUserPassword };
