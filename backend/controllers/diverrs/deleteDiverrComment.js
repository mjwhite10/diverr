const {
  getDiverrById,
  deleteDiverrCommentById,
  getDiverrCommentById,
} = require('../../db/diverrs');
const { generateError } = require('../../helpers');
const {
  getDiverrCommentSchema,
} = require('../../validators/diverrsValidators');

const deleteDiverrComment = async (req, res, next) => {
  try {
    //Validamos los parametros
    await getDiverrCommentSchema.validateAsync(req.params);
    const { idDiverr, idComment } = req.params;

    //Comprobamos que existe el diverr
    const diverr = await getDiverrById(idDiverr);

    //Comprobamos que existe el comentario
    const comment = await getDiverrCommentById(idComment, idDiverr);

    //Comprobamos que el diverr no estaba finalizado
    if (diverr.status === 'Completed')
      throw generateError(
        `No se puede borrar un comentario de un diverr finalizado`,
        401
      );

    //Comprobamos que el usuario es el mismo
    //que genera el comentario o es admin
    if (req.auth.id !== comment.idUser && req.auth.role !== 'admin')
      throw generateError(
        `No tienes los permisos para borrar ese comentario`,
        401
      );
    //Borramos el comentario solicitado
    await deleteDiverrCommentById(idComment);

    res.send({
      status: 'ok',
      message: `El comentario con id ${idComment} del diverr con id: ${idDiverr} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteDiverrComment };
