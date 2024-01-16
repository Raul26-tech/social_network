import { Request, Response } from "express";
import { CreateUSerService } from "../../../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, passwordConfirm, gender, status, type } =
      request.body;
    const createUserService = new CreateUSerService();

    const user = await createUserService.excute({
      name,
      email,
      gender,
      password,
      passwordConfirm,
      status,
      type,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
