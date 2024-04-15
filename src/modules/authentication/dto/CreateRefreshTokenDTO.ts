interface ICreateRefreshTokenDTO {
  userId: string;
  email?: string;
  issuedAt?: Date;
  expirationTime?: Date;
  token?: string;
}

export { ICreateRefreshTokenDTO };
