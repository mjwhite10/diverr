const { getDiverrsCategories } = require('../../db/diverrs');

const listDiverrCategories = async (req, res, next) => {
  try {
    //Recogemos las categorías y las devolvemos
    const data = await getDiverrsCategories();

    res.send({
      status: 'Ok',
      message: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listDiverrCategories };
