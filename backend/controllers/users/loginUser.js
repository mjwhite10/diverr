const jsonwebtoken = require('jsonwebtoken');
const { getUserByEmail } = require('../../db/users');
const { generateError, checkPassword } = require('../../helpers');
const { loginUserSchema } = require('../../validators/userValidators');

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Validamos el body
    await loginUserSchema.validateAsync(req.body);

    //Recojemos los datos del user con el email
    const user = await getUserByEmail(email);

    if (!user)
      throw generateError(
        `No existe ningún usuario con el email ${email}`,
        404
      );
    //Comparamos las passwords
    await checkPassword(password, user.password);

    //Creamos el payload del token
    const payload = { id: user.id, role: user.role };

    //Firmamos el token
    const token = jsonwebtoken.sign(payload, process.env.SECRET, {
      expiresIn: '30d',
    });

    //Enviamos el token
    res.send({
      status: 'ok',
      message: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser };
