interface IVerifyTokenDTO {
  bearerToken: string;
  ignoreExpiration?: boolean;
}

export { IVerifyTokenDTO };
