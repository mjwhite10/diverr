const { getDiverrById, getDiverrCommentById } = require('../../db/diverrs');
const {
  getDiverrCommentSchema,
} = require('../../validators/diverrsValidators');

const getDiverrComment = async (req, res, next) => {
  try {
    //Validamos los parametros
    await getDiverrCommentSchema.validateAsync(req.params);
    const { idDiverr, idComment } = req.params;

    //Comprobamos que existe el diverr
    await getDiverrById(idDiverr);

    //Comprobamos que existe el comentario
    const comment = await getDiverrCommentById(idComment, idDiverr);

    res.send({
      status: 'Ok',
      message: comment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDiverrComment };
