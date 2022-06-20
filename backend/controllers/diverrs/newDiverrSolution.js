const {
  getDiverrById,
  getDiverrSolutionById,
  createDiverrSolution,
} = require('../../db/diverrs');
const { generateError } = require('../../helpers');
const { idDiverrSchema } = require('../../validators/diverrsValidators');
const newDiverrSolution = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idDiverrSchema.validateAsync(req.params);
    const { idDiverr } = req.params;

    //Comprobamos que existe el diverr
    const diverr = await getDiverrById(idDiverr);
    //Comprobamos que el diverr no tiene asignada una solución
    const solution = await getDiverrSolutionById(idDiverr);
    if (solution)
      throw generateError(
        `El diverr con id ${idDiverr} ya tenía asignada una solución`,
        406
      );

    //Comprobamos que el usuario que generó el diverr
    //no es el mismo que lo cubre
    if (req.auth.id === diverr.idUser)
      throw generateError(
        'Un usuario no puede publicar una solución a una necesidad creada por el mismo',
        400
      );
    //Creamos la solución
    const id = await createDiverrSolution(idDiverr, req.auth.id);
    //Enviamos la respuesta
    res.send({
      status: 'Ok',
      message: `Creada la solución con id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newDiverrSolution };
