import * as env from "env-var";

interface IAuth {
  auth_secret_token: string;
  auth_expired_token: string;
}

export default {
  auth_secret_token: env.get("AUTH_SECRET_TOKEN").required().asString(),
  auth_expired_token: env.get("AUTH_EXPIRES_TOKEN").required().asString(),
} as IAuth;
