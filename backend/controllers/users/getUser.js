const { getUserById } = require('../../db/users');

const getUser = async (req, res, next) => {
  try {
    //Seleccionamos el usuario por id
    const user = await getUserById(req.auth.id);

    res.send({
      status: 'ok',
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser };
