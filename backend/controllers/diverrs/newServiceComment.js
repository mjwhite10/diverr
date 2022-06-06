const { getServiceById, createServiceComment } = require('../../db/diverrs');
const { generateError } = require('../../helpers');
const {
  idServiceSchema,
  newServiceCommentSchema,
} = require('../../validators/diverrsValidators');

const newServiceComment = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idServiceSchema.validateAsync(req.params);
    //Validamos el body
    await newServiceCommentSchema.validateAsync(req.body);

    const { idService } = req.params;
    const { content } = req.body;

    //Comprobamos que existe el servicio
    const service = await getServiceById(idService);

    //Comprobamos que el servicio esta Unassigned
    if (service.status !== 'Unassigned')
      throw generateError(
        'El servicio ya está cubierto por un usuario, no se admiten comentarios nuevos',
        406
      );
    //Generamos el comentario
    const id = await createServiceComment(req.auth.id, idService, content);

    res.send({
      status: 'Ok',
      message: `Creado el comentario con id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newServiceComment };
