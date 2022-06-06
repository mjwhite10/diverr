const { getServiceById, editServiceCommentById } = require('../../db/services');
const { generateError } = require('../../helpers');
const {
  newServiceCommentSchema,
  getServiceCommentSchema,
} = require('../../validators/servicesValidators');

const editServiceComment = async (req, res, next) => {
  try {
    //Validamos los parametros
    await getServiceCommentSchema.validateAsync(req.params);
    //Validamos el body
    await newServiceCommentSchema.validateAsync(req.body);
    const { idService, idComment } = req.params;
    const { content } = req.body;

    //Comprobamos que existe el servicio
    const service = await getServiceById(idService);

    //Comprobamos que el servicio esta Unassigned
    if (service.status !== 'Unassigned')
      throw generateError(
        'El servicio ya está cubierto por un usuario, no se pueden editar los comentarios',
        406
      );

    //Editamos el comentario
    await editServiceCommentById(idService, idComment, content);
    res.send({
      status: 'Ok',
      message: 'Se editó el comentario',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { editServiceComment };
