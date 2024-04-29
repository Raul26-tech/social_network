import * as env from "env-var";

interface IAuth {
  auth_secret_token: string;
  auth_expired_token: number;
  auth_expired_refreshToken: number;
}

export default {
  auth_secret_token: env.get("AUTH_SECRET_TOKEN").required().asString(),
  auth_expired_token: env.get("AUTH_EXPIRES_TOKEN").required().asInt(),
  auth_expired_refreshToken: env
    .get("AUTH_EXPIRES_SECRET_TOKEN")
    .required()
    .asInt(),
} as IAuth;
