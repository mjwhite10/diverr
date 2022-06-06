const { getServiceById, getServiceComments } = require('../../db/diverrs');
const { idServiceSchema } = require('../../validators/diverrsValidators');

const listServiceComments = async (req, res, next) => {
  try {
    //Validamos los parametros
    await idServiceSchema.validateAsync(req.params);
    const { idService } = req.params;

    //Comprobamos que existe el servicio
    await getServiceById(idService);

    //Comprobamos que existe el comentario
    const data = await getServiceComments(idService);

    res.send({
      status: 'Ok',
      message: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listServiceComments };
