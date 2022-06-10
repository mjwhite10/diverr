require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
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
  editDiverrSolution,
  deleteDiverrSolution,
  listDiverrComments,
  getDiverrComment,
  newDiverrComment,
  editDiverrComment,
  deleteDiverrComment,
  listDiverrCategories,
  listDiverrStatus,
} = require('./controllers/diverrs');

//Middlewares
const { isUser } = require('./middlewares/isUser');
const { isAdmin } = require('./middlewares/isAdmin');

const app = express();
app.use(express.json());
app.use(cors());
// Log de peticiones a la consola
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Procesado de body tipo form-data
app.use(fileUpload());
app.use('/uploads', express.static('./uploads'));

//Users endpoints
app.post('/users', newUser);
app.get('/users', isUser, getUser);
app.post('/users/login', loginUser);
app.put('/users/:idUser', isUser, editUser);
app.put('/users/:idUser/password', isUser, editUserPassword);
app.delete('/users/:idUser', isUser, isAdmin, deleteUser);

//Diverrs endpoints//
//Diverrs
app.get('/diverr', listDiverrs);
app.get('/diverr/:idDiverr', getDiverr);
app.post('/diverr', isUser, newDiverr);
app.put('/diverr/:idDiverr', isUser, editDiverr);
app.delete('/diverr/:idDiverr', isUser, deleteDiverr);
//Diverrss solutions
app.get('/diverr/:idDiverr/solution', isUser, getDiverrSolution);
app.post('/diverr/:idDiverr/solution', isUser, newDiverrSolution);
app.put('/diverr/:idDiverr/solution', isUser, editDiverrSolution);
app.delete('/diverr/:idDiverr/solution', isUser, deleteDiverrSolution);
//Services comments
app.get('/diverr/:idDiverr/comments', listDiverrComments);
app.get('/diverr/:idDiverr/comments/:idComment', getDiverrComment);
app.post('/diverr/:idDiverr/comments', isUser, newDiverrComment);
app.put('/diverr/:idDiverr/comments/:idComment', editDiverrComment);
app.delete(
  '/diverr/:idDiverr/comments/:idComment',
  isUser,
  deleteDiverrComment
);
//Services categories
app.get('/categories', listDiverrCategories);
//Services status
app.get('/status', listDiverrStatus);
//Not found Middleware
app.use((req, res) => {
  console.warn('Error 404 Not Found');
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

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
