import { Request, Response } from "express";
import { CreateUSerService } from "../../../services/CreateUserService";
import { container } from "@shared/container/inversify.config";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const {
      name,
      email,
      password,
      passwordConfirm,
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
    } = request.body;
    const createUserService = container.resolve(CreateUSerService);

    const user = await createUserService.excute({
      name,
      email,
      gender,
      password,
      passwordConfirm,
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
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
