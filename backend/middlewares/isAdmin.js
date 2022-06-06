const { generateError } = require('../helpers');

async function isAdmin(req, res, next) {
  try {
    if (req.auth.role !== 'admin')
      throw generateError('No tienes privilegios de administrador', 403);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { isAdmin };
