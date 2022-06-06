const { getServiceCategories } = require('../../db/services');

const listServicesCategories = async (req, res, next) => {
  try {
    //Recogemos las categorías y las devolvemos
    const data = await getServiceCategories();

    res.send({
      status: 'Ok',
      message: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listServicesCategories };
