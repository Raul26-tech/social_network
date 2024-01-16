import env from "env-var";

interface IEnvironment {
  PORT: number;
  DB_PORT: number;
  DB_TYPE: "postgres";
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_LOGGING: boolean;
}

export default {
  PORT: env.get("PORT").required().asPortNumber(),
  DB_PORT: env.get("DB_PORT").required().asPortNumber(),
  DB_TYPE: env.get("DB_TYPE").required().asString(),
  DB_HOST: env.get("DB_HOST").required().asString(),
  DB_USERNAME: env.get("DB_USERNAME").required().asString(),
  DB_PASSWORD: env.get("DB_PASSWORD").required().asString(),
  DB_DATABASE: env.get("DB_DATABASE").required().asString(),
  DB_LOGGING: env.get("DB_LOGGING").asBool(),
} as IEnvironment;
