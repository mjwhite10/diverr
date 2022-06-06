const { getServiceStatus } = require('../../db/services');

const listServicesStatus = async (req, res, next) => {
  try {
    //Recogemos las categorías y las devolvemos
    const data = await getServiceStatus();

    res.send({
      status: 'Ok',
      message: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listServicesStatus };
