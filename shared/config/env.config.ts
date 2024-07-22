import { ConfigModuleOptions } from "@nestjs/config";
import * as Joi from "joi";
import path from "path"

export const configOptions: ConfigModuleOptions = {
  envFilePath: [path.resolve(process.cwd(), "../.env")],
  isGlobal: true,
  ignoreEnvFile: false,
  validationSchema: Joi.object({
    DATABASE_HOST: Joi.string().required(),
  }),
  validationOptions: {
    abortEarly: false,
    allowUnknown: true,
  },
};
