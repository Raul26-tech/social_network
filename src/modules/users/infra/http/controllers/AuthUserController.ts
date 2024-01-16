import { Request, Response } from "express";
import { AuthenticationUserService } from "../../../services/AuthenticationUserService";

class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const authUser = new AuthenticationUserService();

    const { token, user } = await authUser.execute(email, password);

    response.setHeader("token", token);

    return response.json({ token, user });
  }
}

export { AuthUserController };
