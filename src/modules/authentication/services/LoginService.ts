import { UserRepository } from "@modules/users/infra/typeorm/repositories/UserRepository";
import { AppError } from "../../../shared/errors/AppError";
import bcrypt from "bcryptjs";
import { container } from "@shared/container/inversify.config";
import { inject, injectable } from "inversify";
import { LoginSchema } from "../schemas/LoginSchema";
import { SignTokenService } from "./SignTokenService";
import { LoginServiceDTO } from "../dto/LoginServiceDTO";

@injectable()
class LoginService {
  constructor(
    @inject("UserRepository")
    private _userRepository: UserRepository
  ) {}

  async execute({ email, password }: LoginServiceDTO) {
    // Validando as entradas do usuário
    LoginSchema.parse({ email, password });

    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário ou senha incorreto(s)");
    }

    const pwd = await bcrypt.compare(password, user.password);

    if (!pwd) {
      throw new AppError("Usuário ou senha incorreto(s)");
    }

    // Assinando o token e um refresh token
    const signTokenService = container.resolve(SignTokenService);

    const { accesToken, refreshToken } = await signTokenService.execute({
      userId: user.id,
      email: user.email,
    });

    return {
      accesToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

export { LoginService };
