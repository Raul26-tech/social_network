import { EntityManager, Repository } from "typeorm";
import { RefreshToken } from "../entities/RefreshToken";
import { injectable } from "inversify";
import { BaseRepository } from "@shared/infra/typeorm/repositories/BaseRepository";
import { ICreateRefreshTokenDTO } from "@modules/authentication/dto/CreateRefreshTokenDTO";

@injectable()
class RefreshTokenRepository extends BaseRepository {
  private _repository: Repository<RefreshToken>;

  constructor(manager?: EntityManager) {
    super(manager);
    this._repository = this.dataSource.getRepository(RefreshToken);
  }

  async createUserToken({
    email,
    expirationTime,
    issuedAt,
    token,
    userId,
  }: ICreateRefreshTokenDTO) {
    const refreshToken = this._repository.create({
      userId,
      email,
      token,
      expirationTime,
      issuedAt,
    });

    await this._repository.save(refreshToken);

    return refreshToken;
  }

  async findByToken(userId: string) {
    const user = await this._repository.findOne({ where: { userId } });
    return user;
  }
}

export { RefreshTokenRepository };
