import Joi from 'joi';

export const createEmployeeSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  age: Joi.number().integer().min(18).max(65).required(),
  designation: Joi.string().trim().required(),
  hiring_date: Joi.date().required(),
  date_of_birth: Joi.date().less('now').required(),
  salary: Joi.number().precision(2).positive().required(),
  photo_path: Joi.string().optional(),
});
