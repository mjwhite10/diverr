const { getDiverrSolutionsByUserId } = require('../../db/diverrs');

const listDiverrSolutionsByUser = async (req, res, next) => {
  try {
    const data = await getDiverrSolutionsByUserId(req.auth.id);
    //Devolvemos la información
    res.send({
      status: 'ok',
      message: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listDiverrSolutionsByUser };
