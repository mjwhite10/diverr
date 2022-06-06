const { listServices } = require('./listServices');
const { getService } = require('./getService');
const { newService } = require('./newService');
const { editService } = require('./editService');
const { deleteService } = require('./deleteService');
const { newServiceSolution } = require('./newServiceSolution');
const { getServiceSolution } = require('./getServiceSolution');
const { editServiceSolution } = require('./editServiceSolution');
const { deleteServiceSolution } = require('./deleteServiceSolution');
const { newServiceComment } = require('./newServiceComment');
const { getServiceComment } = require('./getServiceComment');
const { listServiceComments } = require('./listServiceComments');
const { editServiceComment } = require('./editServiceComment');
const { deleteServiceComment } = require('./deleteServiceComment');
const { listServicesCategories } = require('./listServicesCategories');
const { listServicesStatus } = require('./listServicesStatus');
module.exports = {
  listServices,
  getService,
  newService,
  editService,
  deleteService,
  newServiceSolution,
  getServiceSolution,
  editServiceSolution,
  deleteServiceSolution,
  newServiceComment,
  getServiceComment,
  listServiceComments,
  editServiceComment,
  deleteServiceComment,
  listServicesCategories,
  listServicesStatus,
};
