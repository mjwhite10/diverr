const Joi = require('@hapi/joi');
const { generateError } = require('../helpers');

const idDiverrSchema = Joi.object().keys({
  idDiverr: Joi.number()
    .positive()
    .required()
    .greater(0)
    .error(
      generateError(
        'El campo idDiverr debe exisitir y debe ser un entero mayor que 0 ',
        400
      )
    ),
});

const diverrSchema = Joi.object().keys({
  title: Joi.string()
    .max(100)
    .required()
    .error(
      generateError(
        'El campo title debería existir y no exceder los 100 caracteres',
        400
      )
    ),
  info: Joi.string()
    .max(500)
    .required()
    .error(
      generateError(
        'El campo info debería existir y no exceder los 500 caracteres',
        400
      )
    ),
  category: Joi.string()
    .max(100)
    .required()
    .error(
      generateError(
        'El campo category debería existir y no exceder los 100 caracteres',
        400
      )
    ),
  price: Joi.number()
    .max(10000)
    .required()
    .error(
      generateError(
        'El campo price debería existir y no exceder el valor de 10000',
        400
      )
    ),
});

const newDiverrCommentSchema = Joi.object().keys({
  content: Joi.string()
    .required()
    .max(280)
    .error(
      generateError(
        'El campo content debe existir y no debe exceder los 280 caracteres',
        400
      )
    ),
});

const editDiverrSolutionSchema = Joi.object().keys({
  finished: Joi.boolean()
    .required()
    .error(
      generateError(
        'El campo fisnished debe existir y ser del tipo boleano',
        400
      )
    ),
});

const getDiverrCommentSchema = Joi.object().keys({
  idDiverr: Joi.number()
    .positive()
    .required()
    .greater(0)
    .error(
      generateError(
        'El campo idService debe exisitir y debe ser un entero mayor que 0 ',
        400
      )
    ),
  idComment: Joi.number()
    .positive()
    .required()
    .greater(0)
    .error(
      generateError(
        'El campo idComment debe exisitir y debe ser un entero mayor que 0 ',
        400
      )
    ),
});
module.exports = {
  idDiverrSchema,
  newDiverrCommentSchema,
  diverrSchema,
  editDiverrSolutionSchema,
  getDiverrCommentSchema,
};
