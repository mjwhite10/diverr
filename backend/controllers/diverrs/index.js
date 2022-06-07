const { listDiverrs } = require('./listDiverrs');
const { getDiverr } = require('./getDiverr');
const { newDiverr } = require('./newDiverr');
const { editDiverr } = require('./editDiverr');
const { deleteDiverr } = require('./deleteDiverr');
const { newDiverrSolution } = require('./newDiverrSolution');
const { getDiverrSolution } = require('./getDiverrSolution');
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
  listDiverrs,
  getDiverr,
  newDiverr,
  editDiverr,
  deleteDiverr,
  newDiverrSolution,
  getDiverrSolution,
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
