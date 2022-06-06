const path = require('path');
const { createService, getIdCategory } = require('../../db/services');
const {
  generateError,
  createPathIfNotExits,
  processAndSaveFile,
} = require('../../helpers');
const { serviceSchema } = require('../../validators/servicesValidators');

const newService = async (req, res, next) => {
  try {
    //Validamos el body
    await serviceSchema.validateAsync(req.body);
    const { title, info, category } = req.body;

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
      } catch (error) {
        console.log(error.message);
        throw generateError(
          'No se pudo procesar el fichero adjunto. Inténtalo de nuevo',
          400
        );
      }
    }

    //Creamos el servicio
    const idService = await createService(
      req.auth.id,
      title,
      info,
      fileName,
      idCategory.id
    );

    res.send({
      status: 'Ok',
      message: `Creado el Service con id ${idService}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newService };
