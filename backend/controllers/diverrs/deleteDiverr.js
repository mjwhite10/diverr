const path = require('path');
const {
  getDiverrById,
  getDiverrSolutionById,
  deleteDiverrById,
} = require('../../db/diverrs');
const { generateError, deleteFile } = require('../../helpers');
const { idDiverrSchema } = require('../../validators/diverrsValidators');
const deleteDiverr = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idDiverrSchema.validateAsync(req.params);
    const { idDiverr } = req.params;

    //Comprobamos que existe el servicio
    const diverr = await getDiverrById(idDiverr);

    //Comprobamos que el usuario que hace la peticció sea admin
    //o el usuario que creó el servicio
    if (diverr.idUser !== req.auth.id && req.auth.role !== 'admin')
      throw generateError('No tienes permisos para eliminar este diverr', 401);

    //Comprobamos que el servicio NO tiene asignada una solución
    const solution = await getDiverrSolutionById(idDiverr);
    if (solution || diverr.status != 'Unassigned')
      throw generateError(
        `El servicio con id ${idDiverr} tiene asignada una solución. No se puede borrar`,
        404
      );

    //Si tenía asignado un fichero lo eliminamos
    if (diverr.file) {
      const uploadPath = path.join(__dirname, '../../uploads/diverrs');
      await deleteFile(path.join(uploadPath, diverr.file));
    }
    //Si tenía asignado un fichero lo eliminamos
    if (diverr.picture) {
      const uploadPath = path.join(__dirname, '../../uploads/covers');
      await deleteFile(path.join(uploadPath, diverr.picture));
    }
    //Borramos el idDiverr
    await deleteDiverrById(idDiverr);

    //Enviamos la respuesta
    res.send({
      status: 'error',
      message: `El diverr con id ${idDiverr} se eliminó correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteDiverr };
