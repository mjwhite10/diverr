const { getServiceById, getServiceCommentById } = require('../../db/diverrs');
const {
  getServiceCommentSchema,
} = require('../../validators/diverrsValidators');

const getServiceComment = async (req, res, next) => {
  try {
    //Validamos los parametros
    await getServiceCommentSchema.validateAsync(req.params);
    const { idService, idComment } = req.params;

    //Comprobamos que existe el servicio
    await getServiceById(idService);

    //Comprobamos que existe el comentario
    const comment = await getServiceCommentById(idComment, idService);

    res.send({
      status: 'Ok',
      message: comment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getServiceComment };
