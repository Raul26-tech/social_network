import { RefreshToken } from "@modules/authentication/infra/typeorm/entities/RefreshToken";

interface IUserTokenRepositories {
  createUserToken(userId: string): Promise<RefreshToken>;
  findByToken(id: string): Promise<RefreshToken>;
}

export { IUserTokenRepositories };
