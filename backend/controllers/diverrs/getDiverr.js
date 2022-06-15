const { getDiverrById } = require('../../db/diverrs');
const { idDiverrSchema } = require('../../validators/diverrsValidators');

const getDiverr = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idDiverrSchema.validateAsync(req.params);
    const { idDiverr } = req.params;

    //Comprobamos que existe el diverr
    const diverr = await getDiverrById(idDiverr);

    //Devolvemos la información
    res.send({
      status: 'ok',
      message: diverr,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDiverr };
