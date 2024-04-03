import { Repository } from "typeorm";
import { IUserTokenRepositories } from "../../../irepositories/IRefreshTokenRepositories";
import { RefreshToken } from "../entities/RefreshToken";
import { AppDataSource } from "../../../../../shared/infra/db/connectDatabase";

class RefreshTokenRepository implements IUserTokenRepositories {
  private repository: Repository<RefreshToken>;

  constructor() {
    this.repository = AppDataSource.getRepository(RefreshToken);
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
}

export { RefreshTokenRepository };
