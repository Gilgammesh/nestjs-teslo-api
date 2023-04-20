import * as Joi from 'joi';

export const AppValidationSchema = Joi.object({
  PORT: Joi.number().default(4000).required(),
  HOST_API: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  DB_POSTGRES_HOST: Joi.string().required(),
  DB_POSTGRES_PORT: Joi.number().default(5432).required(),
  DB_POSTGRES_NAME: Joi.string().required(),
  DB_POSTGRES_USER: Joi.string().required(),
  DB_POSTGRES_PASSWORD: Joi.string().required()
});
