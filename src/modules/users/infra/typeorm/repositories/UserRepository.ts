import { EntityManager, Repository } from "typeorm";
import { User } from "../entities/User";
import { ICreateUserDTO } from "../../../dto/ICreateUserDTO";
import { BaseRepository } from "@shared/infra/typeorm/repositories/BaseRepository";
import { injectable } from "inversify";

@injectable()
class UserRepository extends BaseRepository {
  private _repository: Repository<User>;

  constructor(manager?: EntityManager) {
    super(manager);
    this._repository = this.dataSource.getRepository(User);
  }

  async create({
    name,
    email,
    password,
    gender,
    status,
    type,
    avatar,
    cellPhone,
    phone,
    postalCode,
    street,
    number,
    complement,
    district,
    city,
    state,
  }: ICreateUserDTO) {
    const user = this._repository.create({
      name,
      email,
      password,
      gender,
      status,
      type,
      avatar,
      cellPhone,
      phone,
      postalCode,
      street,
      number,
      district,
      complement,
      city,
      state,
    });

    await this._repository.save(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = await this._repository.findOne({
      where: { email },
    });

    return user;
  }

  async listUsers() {
    const users = await this._repository.find();

    return users;
  }
}

export { UserRepository };
