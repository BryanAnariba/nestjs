import 'dotenv/config';
import * as joi from 'joi';
import { JoiEnvVars } from 'src/interfaces';

const envVarsSchema = joi.object({
  PORT: joi.number().required(),
  DATABASE_URL: joi.string().required(),
  SEED: joi.string().required(),
})
.unknown(true);

const {error, value} = envVarsSchema.validate(process.env);

if (error) throw new Error(`Sometime went wrong with the environment vars: ${error}`);

const envVars: JoiEnvVars = value;

export const envs = {
  port: envVars.PORT,
  batabaseUrl: envVars.DATABASE_URL,
  seed: envVars.SEED,
};