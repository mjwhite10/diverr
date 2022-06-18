const {
  getDiverrById,
  editDiverrCommentById,
  getDiverrCommentById,
} = require('../../db/diverrs');
const { generateError } = require('../../helpers');
const {
  newDiverrCommentSchema,
  getDiverrCommentSchema,
} = require('../../validators/diverrsValidators');

const editDiverrComment = async (req, res, next) => {
  try {
    //Validamos los parametros
    await getDiverrCommentSchema.validateAsync(req.params);
    //Validamos el body
    await newDiverrCommentSchema.validateAsync(req.body);
    const { idDiverr, idComment } = req.params;
    const { content } = req.body;

    //Comprobamos que existe el diverr
    const diverr = await getDiverrById(idDiverr);

    //Comprobamos que el servicio esta Unassigned
    if (diverr.status !== 'Unassigned')
      throw generateError(
        'El diverr ya está cubierto por un usuario, no se pueden editar los comentarios',
        406
      );

    //Editamos el comentario
    await editDiverrCommentById(idDiverr, idComment, content);

    const comment = await getDiverrCommentById(idComment, idDiverr);
    res.send({
      status: 'Ok',
      message: comment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { editDiverrComment };
