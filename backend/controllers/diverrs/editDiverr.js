const path = require('path');
const {
  getIdCategory,
  getDiverrById,
  editDiverrById,
} = require('../../db/diverrs');
const {
  generateError,
  createPathIfNotExits,
  processAndSaveFile,
  deleteFile,
  processAndSaveImage,
} = require('../../helpers');
const {
  diverrSchema,
  idDiverrSchema,
} = require('../../validators/diverrsValidators');
const editDiverr = async (req, res, next) => {
  try {
    //Validamos los parametros
    await idDiverrSchema.validateAsync(req.params);
    //Validamos el body
    await diverrSchema.validateAsync(req.body);
    const { title, info, category, price } = req.body;
    const { idDiverr } = req.params;

    //Comprobamos que existe el diverr
    const diverr = await getDiverrById(idDiverr);

    //Comprobamos que el usuario sea el mismo o admin
    if (req.auth.id !== diverr.idUser && req.auth.role !== 'admin')
      throw generateError('No tienes permisos para editar este diverr', 401);

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

        //Si ya tenia guardado otro avatar lo eliminamos
        if (diverr.picture)
          await deleteFile(path.join(uploadPath, diverr.picture));
      } catch (error) {
        console.log(error.message);
        throw generateError(
          'No se pudo procesar la imagen. Inténtalo de nuevo',
          400
        );
      }
    } else {
      pictureName = diverr.picture;
    }

    //Comprobamos si se adjuntó algún fichero
    let fileName;
    if (req.files?.file) {
      try {
        const uploadPath = path.join(__dirname, '../../uploads/diverrs');
        //Creo el path de uploads si no existe
        await createPathIfNotExits(uploadPath);
        fileName = await processAndSaveFile(req.files.file, uploadPath);
        //Si ya tenia guardado otro fichero lo eliminamos
        if (diverr.file) await deleteFile(path.join(uploadPath, diverr.file));
      } catch (error) {
        console.log(error.message);
        throw generateError(
          'No se pudo procesar el fichero adjunto. Inténtalo de nuevo',
          400
        );
      }
    } else {
      fileName = diverr.file;
    }
    //Modificamos los datos del diverr
    await editDiverrById(
      idDiverr,
      title,
      info,
      fileName,
      pictureName,
      price,
      idCategory.id
    );
    res.send({
      status: 'Ok',
      message: `Se modificó el diverr con id ${idDiverr} `,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { editDiverr };
