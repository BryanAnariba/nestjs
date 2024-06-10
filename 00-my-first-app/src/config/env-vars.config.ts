import 'dotenv/config';
import * as joi from 'joi';
import { JoiEnvVars } from 'src/presentation/interfaces';

const envVarsSchema = joi.object({
  PORT: joi.number().required(),
}).unknown(true);

const {error, value} = envVarsSchema.validate(process.env);

if (error) throw new Error(`Sometime went wrong with the environment vars: ${error}`);

const envVars: JoiEnvVars = value;

export const envs = {
  port: envVars.PORT,
}