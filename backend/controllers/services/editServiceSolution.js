const path = require('path');
const {
  getServiceById,
  getServiceSolutionByIdService,
  editServiceSolutionById,
} = require('../../db/services');
const {
  generateError,
  createPathIfNotExits,
  processAndSaveFile,
  deleteFile,
} = require('../../helpers');
const {
  idServiceSchema,
  editServiceSolutionSchema,
} = require('../../validators/servicesValidators');

const editServiceSolution = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idServiceSchema.validateAsync(req.params);
    //Validamos el body
    await editServiceSolutionSchema.validateAsync(req.body);
    const { idService } = req.params;
    const { finished } = req.body;

    //Comprobamos que existe el servicio
    const service = await getServiceById(idService);

    //Comprobamos que el servicio tiene asignada una solución
    const solution = await getServiceSolutionByIdService(idService);
    if (!solution)
      throw generateError(
        `No existe ninguna solución asignada al servicio con id ${idService}`,
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
      fileName = service.file;
    }

    //Modificamos la solución
    await editServiceSolutionById(idService, fileName, finished);
    res.send({
      status: 'Ok',
      message: 'La solución se modificó correctamente',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { editServiceSolution };
