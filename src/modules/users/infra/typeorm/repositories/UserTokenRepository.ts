import { Repository } from "typeorm";
import { IUserTokenRepositories } from "../../../irepositories/IUserTokenRepositories";
import { UserToken } from "../entities/UserToken";
import { AppDataSource } from "../../../../../shared/infra/typeorm/connectDatabase";

class UserTokenRepository implements IUserTokenRepositories {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserToken);
  }

  async createUserToken(userId: string) {
    const token = this.repository.create({
      userId,
    });

    await this.repository.save(token);

    return token;
  }

  async findByToken(userId: string) {
    const user = await this.repository.findOne({ where: { userId } });
    return user;
  }

  //  async updatedToken(id: string) {

  //   }
}

export { UserTokenRepository };
