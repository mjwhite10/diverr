const {
  getServiceById,
  deleteServiceCommentById,
  getServiceCommentById,
} = require('../../db/services');
const { generateError } = require('../../helpers');
const {
  getServiceCommentSchema,
} = require('../../validators/servicesValidators');

const deleteServiceComment = async (req, res, next) => {
  try {
    //Validamos los parametros
    await getServiceCommentSchema.validateAsync(req.params);
    const { idService, idComment } = req.params;

    //Comprobamos que existe el servicio
    const service = await getServiceById(idService);

    //Comprobamos que existe el comentario
    const comment = await getServiceCommentById(idComment, idService);

    //Comprobamos que el servicio no estaba finalizado
    if (service.status !== 'Completed')
      throw generateError(
        `No se puede borrar un comentario de un servicio finalizado`,
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
    await deleteServiceCommentById(idComment);

    res.send({
      status: 'ok',
      message: `El comentario del servicio con id: ${idService} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteServiceComment };
