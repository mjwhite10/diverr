const { createUser, getUserByEmail } = require('../../db/users');
const { generateError } = require('../../helpers');
const { newUserSchema } = require('../../validators/userValidators');

const newUser = async (req, res, next) => {
  try {
    //Validamos los datos de usuario
    await newUserSchema.validateAsync(req.body);

    //Extraemos los campos necesarios
    const { email, password, name } = req.body;

    //Consultamos si existía un usuario con el mismo mail
    const existingEmailUser = await getUserByEmail(email);

    //Si la consulta devulve al menos un usuario lanzamos error
    if (existingEmailUser)
      throw generateError(`Ya existe un usuario con el email ${email}`, 409);

    //Creamos el nuevo usuario
    const idUser = await createUser(email, password, name);

    res.send({
      status: 'Ok',
      message: `Creado el usuario con id ${idUser}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newUser };
