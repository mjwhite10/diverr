const { getDiverrById, getDiverrComments } = require('../../db/diverrs');
const { idDiverrSchema } = require('../../validators/diverrsValidators');

const listDiverrComments = async (req, res, next) => {
  try {
    //Validamos los parametros
    await idDiverrSchema.validateAsync(req.params);
    const { idDiverr } = req.params;

    //Comprobamos que existe el diverr
    await getDiverrById(idDiverr);

    //Comprobamos que existe el comentario
    const data = await getDiverrComments(idDiverr);

    res.send({
      status: 'Ok',
      message: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listDiverrComments };
