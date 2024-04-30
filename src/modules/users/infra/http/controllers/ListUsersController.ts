import { Request, Response } from "express";
import { ListUsersService } from "../../../services/ListUsersService";
import { container } from "@shared/container/inversify.config";

class ListUsersController {
  async handle(request: Request, response: Response) {
    const listUserService = container.resolve(ListUsersService);

    const users = await listUserService.execute();

    return response.status(200).json(users);
  }
}

export { ListUsersController };
