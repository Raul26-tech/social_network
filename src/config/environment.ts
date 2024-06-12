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
  STORAGE_PATH: string;
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

  STORAGE_PATH: env.get("STORAGE_PATH").asString() ?? "/tmp",
} as IEnvironment;

// export default {
//   PORT: process.env.PORT,
//   DB_PORT: process.env.DB_PORT,
//   DB_TYPE: process.env.DB_TYPE,
//   DB_HOST: process.env.DB_HOST,
//   DB_USERNAME: process.env.DB_USERNAME,
//   DB_PASSWORD: process.env.DB_PASSWORD,
//   DB_DATABASE: process.env.DB_DATABASE,
//   DB_LOGGING: process.env.DB_LOGGING,
// } as unknown as IEnvironment;
