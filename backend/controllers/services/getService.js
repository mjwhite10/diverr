const { getServiceById } = require('../../db/services');
const { idServiceSchema } = require('../../validators/servicesValidators');

const getService = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idServiceSchema.validateAsync(req.params);
    const { idService } = req.params;

    //Comprobamos que existe el servicio
    const service = await getServiceById(idService);

    //Filtramos de la info devuelta solo los parámetros más necesarios
    const serviceInfo = {
      User: service.user,
      Title: service.title,
      Info: service.info,
      File: service.file,
      Category: service.category,
      Status: service.status,
    };
    //Devolvemos la información
    res.send({
      status: 'ok',
      data: serviceInfo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getService };
