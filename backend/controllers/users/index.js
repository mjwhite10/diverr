const { deleteUser } = require('./deleteUser');
const { editUserPassword } = require('./editUserPassword');
const { editUser } = require('./editUser');
const { getUser } = require('./getUser');
const { loginUser } = require('./loginUser');
const { newUser } = require('./newUser');

module.exports = {
  deleteUser,
  editUserPassword,
  editUser,
  getUser,
  loginUser,
  newUser,
};
