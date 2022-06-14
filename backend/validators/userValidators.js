const Joi = require('@hapi/joi');
const { generateError } = require('../helpers');

const newUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(
      generateError('El campo email debe existir y ser un email válido', 400)
    ),
  password: Joi.string()
    .min(3)
    .required()
    .error(
      generateError(
        'El campo password debe existir y ser mayor de 4 caracteres',
        400
      )
    ),
  name: Joi.string()
    .required()
    .max(100)
    .error(generateError('El campo nombre debe existir', 400)),
});

const loginUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(
      generateError('El campo email debe existir y ser un email válido', 400)
    ),
  password: Joi.string()
    .min(3)
    .required()
    .error(
      generateError(
        'El campo password debe existir y ser mayor de 4 caracteres',
        400
      )
    ),
});

const editUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .error(generateError('El campo email debe contener un email válido', 400)),
  name: Joi.string()
    .max(100)
    .error(
      generateError('El campo name no puede exceder los 100 caracteres', 400)
    ),
  info: Joi.string()
    .max(150)
    .error(
      generateError('El campo info no puede exceder los 150 caracteres', 400)
    ),
});

const editUserPasswordSchema = Joi.object().keys({
  oldPassword: Joi.string()
    .min(3)
    .required()
    .error(
      generateError(
        'El campo oldPassword debe existir y ser mayor de 3 caracteres',
        400
      )
    ),
  newPassword: Joi.string()
    .min(3)
    .required()
    .error(
      generateError(
        'El campo newPassword debe existir, ser diferente a oldPassword y ser mayor de 3caracteres',
        400
      )
    ),
});

const idUserSchema = Joi.object().keys({
  idUser: Joi.number()
    .positive()
    .required()
    .greater(0)
    .error(
      generateError(
        'El campo idUser debe exisitir y debe ser un entero mayor que 0 ',
        400
      )
    ),
});
module.exports = {
  newUserSchema,
  loginUserSchema,
  editUserSchema,
  editUserPasswordSchema,
  idUserSchema,
};
