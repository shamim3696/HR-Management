import Joi from 'joi';

export const hrUserCreateSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters',
  }),
  name: Joi.string().min(2).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters long',
  }),
});

export const hrUserLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email address',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});
