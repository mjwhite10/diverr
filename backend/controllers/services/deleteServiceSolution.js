const path = require('path');
const {
  getServiceSolutionByIdService,
  getServiceById,
  deleteServiceSolutionById,
} = require('../../db/services');
const { generateError, deleteFile } = require('../../helpers');
const { idServiceSchema } = require('../../validators/servicesValidators');

const deleteServiceSolution = async (req, res, next) => {
  try {
    //Validamos los parametros
    await idServiceSchema.validateAsync(req.params);
    const { idService } = req.params;

    //Comprobamos que existe el servicio
    await getServiceById(idService);

    //Comprobamos que existe la solucion
    const solution = await getServiceSolutionByIdService(idService);
    if (!solution)
      throw generateError(
        `El servicio con id ${idService} no tiene asignada ninguna solución`,
        404
      );

    //Comprobamos que la solución no esta finalizada
    if (solution.finishedAt)
      throw generateError('No se puede eliminar una solución finalizada', 401);

    //Comprobamos que el usuario que borra la solucion
    //es el mismo que la crea o que tiene los permisos necesarios
    if (req.auth.id !== solution.idUser && req.auth.role !== 'admin')
      throw generateError('No estás autorizado para borrar la solución', 401);

    //Si ya tenia asignado un fichero lo eliminamos
    const uploadPath = path.join(__dirname, '../../uploads/solutions');
    if (solution.file) await deleteFile(path.join(uploadPath, solution.file));

    //Eliminamos la solución
    await deleteServiceSolutionById(idService);
    res.send({
      status: 'Ok',
      message: `Se eliminó la solución asignada al servicio con id ${idService}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteServiceSolution };
