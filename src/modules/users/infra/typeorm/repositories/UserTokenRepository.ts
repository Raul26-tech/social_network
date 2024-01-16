import { Repository } from "typeorm";
import { IUserTokenRepositories } from "../../../irepositories/IUserTokenRepositories";
import { UserToken } from "../entities/UserToken";
import { AppDataSource } from "../../../../../shared/infra/typeorm/connectDatabase";

class UserTokenRepository implements IUserTokenRepositories {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserToken);
  }

  async createUserToken(user_id: string) {
    const token = this.repository.create({
      userId: user_id,
    });

    await this.repository.save(token);

    return token;
  }
}

export { UserTokenRepository };
