const {
  getServiceById,
  getServiceSolutionByIdService,
  createServiceSolution,
} = require('../../db/diverrs');
const { generateError } = require('../../helpers');
const { idServiceSchema } = require('../../validators/diverrsValidators');
const newServiceSolution = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idServiceSchema.validateAsync(req.params);
    const { idService } = req.params;

    //Comprobamos que existe el servicio
    const service = await getServiceById(idService);

    //Comprobamos que el servicio no tiene asignada una solución
    const solution = await getServiceSolutionByIdService(idService);
    if (solution)
      throw generateError(
        `El servicio con id ${idService} ya tenía asignada una solución`,
        406
      );

    //Comprobamos que el usuario que generó el servicio
    //no es el mismo que lo cubre
    if (req.auth.id === service.idUser)
      throw generateError(
        'Un usuario no puede publicar una solución a una necesidad creada por el mismo',
        400
      );

    //Creamos la solución
    const id = await createServiceSolution(idService, req.auth.id);
    //Enviamos la respuesta
    res.send({
      status: 'Ok',
      message: `Creada la solución con id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newServiceSolution };
