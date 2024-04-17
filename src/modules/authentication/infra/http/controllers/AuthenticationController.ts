import { Request, Response } from "express";
import { LoginService } from "../../../services/LoginService";
import { container } from "@shared/container/inversify.config";

class AuthenticationController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const loginService = container.resolve(LoginService);

    const { accesToken, user } = await loginService.execute({
      email,
      password,
    });

    response.setHeader("accessToken", accesToken);

    return response.json({ accesToken, user });
  }
}

export { AuthenticationController };
