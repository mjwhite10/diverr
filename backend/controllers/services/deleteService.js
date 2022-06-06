const path = require('path');
const {
  getServiceById,
  getServiceSolutionByIdService,
  deleteServiceById,
} = require('../../db/services');
const { generateError, deleteFile } = require('../../helpers');
const { idServiceSchema } = require('../../validators/servicesValidators');
const deleteService = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idServiceSchema.validateAsync(req.params);
    const { idService } = req.params;

    //Comprobamos que existe el servicio
    const service = await getServiceById(idService);

    //Comprobamos que el usuario que hace la peticció sea admin
    //o el usuario que creó el servicio
    if (service.idUser !== req.auth.id && req.auth.role !== 'admin')
      throw generateError('No tienes permisos para eliminar este servico', 401);

    //Comprobamos que el servicio NO tiene asignada una solución
    const solution = await getServiceSolutionByIdService(idService);
    if (solution || service.status != 'Unassigned')
      throw generateError(
        `El servicio con id ${idService} tiene asignada una solución. No se puede borrar`,
        404
      );

    //Si tenía asignado un fichero lo eliminamos
    if (service.file) {
      const uploadPath = path.join(__dirname, '../../uploads/services');
      await deleteFile(path.join(uploadPath, service.file));
    }
    //Borramos el servicio
    await deleteServiceById(idService);

    //Enviamos la respuesta
    res.send({
      status: 'error',
      message: `El servicio con id ${idService} se eliminó correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteService };
