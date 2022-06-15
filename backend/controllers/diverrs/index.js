const { listDiverrs } = require('./listDiverrs');
const { getDiverr } = require('./getDiverr');
const { newDiverr } = require('./newDiverr');
const { editDiverr } = require('./editDiverr');
const { deleteDiverr } = require('./deleteDiverr');
const { newDiverrSolution } = require('./newDiverrSolution');
const { getDiverrSolution } = require('./getDiverrSolution');
const { editDiverrSolution } = require('./editDiverrSolution');
const { deleteDiverrSolution } = require('./deleteDiverrSolution');
const { newDiverrComment } = require('./newDiverrComment');
const { getDiverrComment } = require('./getDiverrComment');
const { listDiverrComments } = require('./listDiverrComments');
const { editDiverrComment } = require('./editDiverrComment');
const { deleteDiverrComment } = require('./deleteDiverrComment');
const { listDiverrCategories } = require('./listDiverrCategories');
const { listDiverrStatus } = require('./listDiverrStatus');
const { listDiverrsByUser } = require('./listDiverrsByUser');
const { listDiverrSolutionsByUser } = require('./listSolutionsByUser');
module.exports = {
  listDiverrs,
  getDiverr,
  newDiverr,
  editDiverr,
  deleteDiverr,
  newDiverrSolution,
  getDiverrSolution,
  editDiverrSolution,
  deleteDiverrSolution,
  newDiverrComment,
  getDiverrComment,
  listDiverrComments,
  editDiverrComment,
  deleteDiverrComment,
  listDiverrCategories,
  listDiverrStatus,
  listDiverrsByUser,
  listDiverrSolutionsByUser,
};
