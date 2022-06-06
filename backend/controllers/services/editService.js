const path = require('path');
const {
  getIdCategory,
  getServiceById,
  editServiceById,
} = require('../../db/services');
const {
  generateError,
  createPathIfNotExits,
  processAndSaveFile,
  deleteFile,
} = require('../../helpers');
const {
  serviceSchema,
  idServiceSchema,
} = require('../../validators/servicesValidators');
const editService = async (req, res, next) => {
  try {
    //Validamos los parametros
    await idServiceSchema.validateAsync(req.params);
    //Validamos el body
    await serviceSchema.validateAsync(req.body);
    const { title, info, category } = req.body;
    const { idService } = req.params;

    //Comprobamos que existe el servicio
    const service = await getServiceById(idService);

    //Comprobamos que el usuario sea el mismo o admin
    if (req.auth.id !== service.idUser && req.auth.role !== 'admin')
      throw generateError('No tienes permisos para editar este servicio', 401);

    //Comprobamos que la categoría existe
    const idCategory = await getIdCategory(category);

    //Comprobamos si se adjuntó algún fichero
    let fileName;
    if (req.files?.serviceFile) {
      try {
        const uploadPath = path.join(__dirname, '../../uploads/services');
        //Creo el path de uploads si no existe
        await createPathIfNotExits(uploadPath);
        fileName = await processAndSaveFile(req.files.serviceFile, uploadPath);
        //Si ya tenia guardado otro fichero lo eliminamos
        if (service.file) await deleteFile(path.join(uploadPath, service.file));
      } catch (error) {
        console.log(error.message);
        throw generateError(
          'No se pudo procesar el fichero adjunto. Inténtalo de nuevo',
          400
        );
      }
    } else {
      fileName = service.file;
    }
    //Modificamos los datos del servicio
    await editServiceById(idService, title, info, fileName, idCategory.id);
    res.send({
      status: 'Ok',
      message: `Se modificó el servicio con id ${idService} `,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { editService };
