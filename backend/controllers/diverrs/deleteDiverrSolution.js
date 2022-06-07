const path = require('path');
const {
  getDiverrSolutionById,
  getDiverrById,
  deleteDiverrSolutionById,
} = require('../../db/diverrs');
const { generateError, deleteFile } = require('../../helpers');
const { idDiverrSchema } = require('../../validators/diverrsValidators');

const deleteDiverrSolution = async (req, res, next) => {
  try {
    //Validamos los parametros
    await idDiverrSchema.validateAsync(req.params);
    const { idDiverr } = req.params;

    //Comprobamos que existe el diverr
    await getDiverrById(idDiverr);

    //Comprobamos que existe la solucion
    const solution = await getDiverrSolutionById(idDiverr);
    if (!solution)
      throw generateError(
        `El diverr con id ${idDiverr} no tiene asignada ninguna solución`,
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
    await deleteDiverrSolutionById(idDiverr);
    res.send({
      status: 'Ok',
      message: `Se eliminó la solución asignada al diverr con id ${idDiverr}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteDiverrSolution };
