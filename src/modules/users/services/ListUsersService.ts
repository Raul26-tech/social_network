import { inject, injectable } from "inversify";
import { UserRepository } from "../infra/typeorm/repositories/UserRepository";

@injectable()
class ListUsersService {
  constructor(
    @inject("UserRepository")
    private _userRepsitory: UserRepository
  ) {}

  async execute() {
    return await this._userRepsitory.listUsers();
  }
}

export { ListUsersService };
