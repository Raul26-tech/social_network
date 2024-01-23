import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUserTokenRepositories {
  createUserToken(userId: string): Promise<UserToken>;
  findByToken(id: string): Promise<UserToken>;
}

export { IUserTokenRepositories };
