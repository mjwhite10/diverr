const { searchServices } = require('../../db/services');

const listServices = async (req, res, next) => {
  try {
    // Sacamos las posibles opciones del querystring:
    //  search: para listar solo las entradas que contengan su valor en place o description
    //  order: para ordernar el listado por title, status, category o createdAt
    //  direction: para la dirección de la ordenación desc o asc
    const { search, order, direction } = req.query;

    //Procesamos la direccion de la query
    const orderDirection =
      (direction && direction.toLowerCase()) === 'desc' ? 'DESC' : 'ASC';

    //Procesamos el campo de orden
    let orderBy;
    switch (order) {
      case 'title':
        orderBy = 'title';
        break;
      case 'status':
        orderBy = 'idStatus';
        break;
      case 'category':
        orderBy = 'idCategory';
        break;
      default:
        orderBy = 'createdAt';
        break;
    }
    //Recogemos el resultado de la query
    const data = await searchServices(search, orderBy, orderDirection);
    //Filtramos la información devuelta
    const servicesInfo = [];
    for (const service of data) {
      servicesInfo.push({
        User: service.user,
        Title: service.title,
        Info: service.info,
        File: service.file,
        Category: service.category,
        Status: service.status,
      });
    }
    res.send({
      status: 'Ok',
      message: servicesInfo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listServices };
