import { UserRepository } from "../infra/typeorm/repositories/UserRepository";

class ListUsersService {
  async execute() {
    const users = new UserRepository();

    return await users.listUsers();
  }
}

export { ListUsersService };
