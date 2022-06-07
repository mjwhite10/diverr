const { getDiverrsStatus } = require('../../db/diverrs');

const listDiverrStatus = async (req, res, next) => {
  try {
    //Recogemos las categorías y las devolvemos
    const data = await getDiverrsStatus();

    res.send({
      status: 'Ok',
      message: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listDiverrStatus };
