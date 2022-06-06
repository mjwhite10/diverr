const path = require('path');
const { deleteUserById, getUserById } = require('../../db/users');
const { deleteFile } = require('../../helpers');
const { idUserSchema } = require('../../validators/userValidators');

const deleteUser = async (req, res, next) => {
  try {
    const { idUser } = req.params;

    //Validamos el id
    await idUserSchema.validateAsync(req.params);

    //Verificamos que el usuario existe
    const user = await getUserById(idUser);

    //Si tenia guardado un avatar lo eliminamos
    if (user.avatar) {
      const uploadPath = path.join(__dirname, '../../uploads/avatar');
      await deleteFile(path.join(uploadPath, user.avatar));
    }
    //Borramos el usuario
    await deleteUserById(idUser);

    res.send({
      status: 'ok',
      message: `El usuario con id: ${idUser} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteUser };
