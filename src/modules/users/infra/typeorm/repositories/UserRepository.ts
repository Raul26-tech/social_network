import { Repository } from "typeorm";
import { IUserRepository } from "../../../irepositories/IUserRepositories";
import { User } from "../entities/User";
import { ICreateUserDTO } from "../../../dto/ICreateUserDTO";
import { AppDataSource } from "../../../../../shared/infra/db/connectDatabase";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    name,
    email,
    password,
    gender,
    status,
    type,
  }: ICreateUserDTO) {
    const user = this.repository.create({
      name,
      email,
      password,
      gender,
      status,
      type,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOne({
      where: { email },
    });

    return user;
  }

  async listUsers() {
    const users = await this.repository.find();

    return users;
  }
}

export { UserRepository };
