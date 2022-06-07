const { getDiverrById, createServiceComment } = require('../../db/diverrs');
const { generateError } = require('../../helpers');
const {
  idDiverrSchema,
  newDiverrCommentSchema,
} = require('../../validators/diverrsValidators');

const newDiverrComment = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idDiverrSchema.validateAsync(req.params);
    //Validamos el body
    await newDiverrCommentSchema.validateAsync(req.body);

    const { idDiverr } = req.params;
    const { content } = req.body;

    //Comprobamos que existe el diverr
    const service = await getDiverrById(idDiverr);

    //Comprobamos que el diverr esta Unassigned
    if (service.status !== 'Unassigned')
      throw generateError(
        'El diverr ya está cubierto por un usuario, no se admiten comentarios nuevos',
        406
      );
    //Generamos el comentario
    const id = await createServiceComment(req.auth.id, idDiverr, content);

    res.send({
      status: 'Ok',
      message: `Creado el comentario con id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newDiverrComment };
