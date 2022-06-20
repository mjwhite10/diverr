const path = require('path');
const {
  getDiverrById,
  getDiverrSolutionById,
  editDiverrSolutionById,
} = require('../../db/diverrs');
const {
  generateError,
  createPathIfNotExits,
  processAndSaveFile,
  deleteFile,
} = require('../../helpers');
const {
  idDiverrSchema,
  editDiverrSolutionSchema,
} = require('../../validators/diverrsValidators');

const editDiverrSolution = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idDiverrSchema.validateAsync(req.params);
    //Validamos el body
    await editDiverrSolutionSchema.validateAsync(req.body);
    const { idDiverr } = req.params;
    const { finished } = req.body;

    //Comprobamos que existe el diverr
    const diverr = await getDiverrById(idDiverr);
    if (!diverr)
      throw generateError(`No existe ningun diverr con id ${idDiverr}`, 404);

    //Comprobamos que el diverr tiene asignada una solución
    const solution = await getDiverrSolutionById(idDiverr);
    if (!solution)
      throw generateError(
        `No existe ninguna solución asignada al diverr con id ${idDiverr}`,
        404
      );

    //Comprobamos que el usuario es el que generó la solución
    if (req.auth.id !== solution.idUser && req.auth.role !== 'admin')
      throw generateError(
        'No estas autorizado para modificar la solución',
        401
      );
    //Comprobamos que la solución no esta finalizada
    if (solution.finishedAt)
      throw generateError('No se puede modificar una solución finalizada', 401);

    //Comprobamos si se adjuntó algún fichero
    let fileName;
    if (req.files?.solutionFile) {
      try {
        const uploadPath = path.join(__dirname, '../../uploads/solutions');
        //Creo el path de uploads si no existe
        await createPathIfNotExits(uploadPath);
        fileName = await processAndSaveFile(req.files.solutionFile, uploadPath);
        //Si ya tenia guardado otro fichero lo eliminamos
        if (solution.file)
          await deleteFile(path.join(uploadPath, solution.file));
      } catch (error) {
        throw generateError(
          'No se pudo procesar el fichero adjunto. Inténtalo de nuevo',
          400
        );
      }
    } else {
      fileName = solution.file;
    }

    //Modificamos la solución
    await editDiverrSolutionById(idDiverr, fileName, finished);
    res.send({
      status: 'Ok',
      message: 'La solución se modificó correctamente',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { editDiverrSolution };
