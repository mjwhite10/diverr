const { getUserById, editUserPasswordById } = require('../../db/users');
const { checkPassword } = require('../../helpers');
const { editUserPasswordSchema } = require('../../validators/userValidators');

const editUserPassword = async (req, res, next) => {
  try {
    const idUser = req.auth.id;

    //Validamos el body
    await editUserPasswordSchema.validateAsync(req.body);

    const { oldPassword, newPassword } = req.body;

    //Comprobamos que el usuario existe
    const user = await getUserById(idUser, true);
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
