const { getDiverrSolutionById, getDiverrById } = require('../../db/diverrs');
const { generateError } = require('../../helpers');
const { idDiverrSchema } = require('../../validators/diverrsValidators');

const getDiverrSolution = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idDiverrSchema.validateAsync(req.params);
    const { idDiverr } = req.params;

    //Comprobamos que existe el diverr
    await getDiverrById(idDiverr);

    //Comprobamos que el diverr tiene asignada una solución
    const solution = await getDiverrSolutionById(idDiverr);
    if (!solution)
      throw generateError(
        `El diverr con id ${idDiverr} no tiene asignada ninguna solución`,
        404
      );
    //Enviamos la solucion
    await res.send({
      status: 'Ok',
      message: solution,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDiverrSolution };
