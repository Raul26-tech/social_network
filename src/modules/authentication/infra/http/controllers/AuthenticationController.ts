import { Request, Response } from "express";
import { LoginService } from "../../../services/LoginService";
import { container } from "@shared/container/inversify.config";
import { RefreshToken } from "../../typeorm/entities/RefreshToken";

class AuthenticationController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const loginService = container.resolve(LoginService);

    const login = await loginService.execute({
      email,
      password,
    });

    return response.status(200).json(login);
  }
}

export { AuthenticationController };
