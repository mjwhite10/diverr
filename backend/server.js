require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
//Users controllers
const {
  deleteUser,
  editUserPassword,
  editUser,
  getUser,
  loginUser,
  newUser,
} = require('./controllers/users');
//Services controllers
const {
  listDiverrs,
  getDiverr,
  newDiverr,
  editDiverr,
  deleteDiverr,
  getDiverrSolution,
  newDiverrSolution,
  // editServiceSolution,
  // deleteServiceSolution,
  // newServiceComment,
  // getServiceComment,
  // listServiceComments,
  // editServiceComment,
  // deleteServiceComment,
  // listServicesCategories,
  // listServicesStatus,
} = require('./controllers/diverrs');

//Middlewares
const { isUser } = require('./middlewares/isUser');
const { isAdmin } = require('./middlewares/isAdmin');

const app = express();
app.use(express.json());

// Log de peticiones a la consola
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Procesado de body tipo form-data
app.use(fileUpload());
app.use('/uploads', express.static('./uploads'));

//Users endpoints
app.post('/users', newUser);
app.get('/users/:idUser', isUser, getUser);
app.post('/users/login', loginUser);
app.put('/users/:idUser', isUser, editUser);
app.put('/users/:idUser/password', isUser, editUserPassword);
app.delete('/users/:idUser', isUser, isAdmin, deleteUser);

//Diverrs endpoints//
//Diverrs
app.get('/diverrs', listDiverrs);
app.get('/diverrs/:idDiverr', getDiverr);
app.post('/diverrs', isUser, newDiverr);
app.put('/diverrs/:idDiverr', isUser, editDiverr);
app.delete('/diverrs/:idDiverr', isUser, deleteDiverr);
//Diverrss solutions
app.get('/diverrs/:idDiverr/solution', isUser, getDiverrSolution);
app.post('/diverrs/:idDiverr/solution', isUser, newDiverrSolution);
// app.put('/diverrs/:idDiverr/solution', isUser, editServiceSolution);
// app.delete('/diverrs/:idDiverr/solution', isUser, deleteServiceSolution);
// //Services comments
// app.post('/diverrs/:idDiverr/comments', isUser, newServiceComment);
// app.get('/diverrs/:idDiverr/comments/:idComment', getServiceComment);
// app.get('/diverrs/:idDiverr/comments', listServiceComments);
// app.put('/diverrs/:idDiverr/comments/:idComment', editServiceComment);
// app.delete(
//   '/diverrs/:idDiverr/comments/:idComment',
//   isUser,
//   deleteServiceComment
// );
// //Services categories
// app.get('/categories', listServicesCategories);
// //Services status
// app.get('/status', listServicesStatus);
// //Not found Middleware
// app.use((req, res) => {
//   console.warn('Error 404 Not Found');
//   res.status(404).send({
//     status: 'error',
//     message: 'Not found',
//   });
// });

//Middlewares de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//Lanzamos el server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor funcionado en localhost:${port} 🙈`);
});
