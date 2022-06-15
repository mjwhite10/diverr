const { getDiverrsByUserId } = require('../../db/diverrs');

const listDiverrsByUser = async (req, res, next) => {
  try {
    const data = await getDiverrsByUserId(req.auth.id);
    //Devolvemos la información
    res.send({
      status: 'ok',
      message: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listDiverrsByUser };
