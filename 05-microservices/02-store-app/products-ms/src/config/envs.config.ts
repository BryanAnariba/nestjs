import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  DEFAULT_LIMIT: number;
  DEFAULT_SKIP: number;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    DEFAULT_LIMIT: joi.number().required(),
    DEFAULT_SKIP: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) throw new Error(`Environments Config Validation: ${error}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  database: envVars.DATABASE_URL,
  default_limit: envVars.DEFAULT_LIMIT,
  default_skip: envVars.DEFAULT_SKIP,
};
