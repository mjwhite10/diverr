const path = require('path');
const { createDiverr, getIdCategory } = require('../../db/diverrs');
const {
  generateError,
  createPathIfNotExits,
  processAndSaveFile,
  processAndSaveImage,
} = require('../../helpers');
const { diverrSchema } = require('../../validators/diverrsValidators');

const newDiverr = async (req, res, next) => {
  try {
    //Validamos el body
    await diverrSchema.validateAsync(req.body);
    const { title, info, category, price } = req.body;

    //Comprobamos que la categoría existe
    const idCategory = await getIdCategory(category);

    //Comprobamos si se envió una imagen para guardar
    let pictureName;
    if (req.files?.picture) {
      try {
        const uploadPath = path.join(__dirname, '../../uploads/covers');
        //Creo el path de uploads si no existe
        await createPathIfNotExits(uploadPath);
        // Procesar y guardar imagen
        pictureName = await processAndSaveImage(
          req.files.picture.data,
          uploadPath
        );
      } catch (error) {
        console.log(error.message);
        throw generateError(
          'No se pudo procesar la imagen. Inténtalo de nuevo',
          400
        );
      }
    }

    //Comprobamos si se adjuntó algún fichero
    let fileName;
    if (req.files?.file) {
      try {
        const uploadPath = path.join(__dirname, '../../uploads/diverrs');
        //Creo el path de uploads si no existe
        await createPathIfNotExits(uploadPath);
        fileName = await processAndSaveFile(req.files.file, uploadPath);
      } catch (error) {
        console.log(error.message);
        throw generateError(
          'No se pudo procesar el fichero adjunto. Inténtalo de nuevo',
          400
        );
      }
    }
    console.log(price);
    //Creamos el diverr
    const idDiverr = await createDiverr(
      req.auth.id,
      title,
      info,
      fileName,
      pictureName,
      price,
      idCategory.id
    );

    res.send({
      status: 'Ok',
      message: `Creado el diverr con id ${idDiverr}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newDiverr };
