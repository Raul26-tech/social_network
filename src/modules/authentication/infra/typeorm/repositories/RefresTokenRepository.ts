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

  async create({
    userId,
    email,
    token,
    issuedAt,
    expirationTime,
  }: ICreateRefreshTokenDTO) {
    const refreshToken = this._repository.create({
      userId,
      email,
      token,
      issuedAt,
      expirationTime,
    });

    console.log(refreshToken);

    await this._repository.save(refreshToken);

    return refreshToken;
  }

  async findByTokenId(userId: string): Promise<RefreshToken[]> {
    const token = await this._repository.findBy({ userId });
    return token;
  }

  async delete(id: string) {
    await this._repository.delete(id);
  }
}

export { RefreshTokenRepository };
