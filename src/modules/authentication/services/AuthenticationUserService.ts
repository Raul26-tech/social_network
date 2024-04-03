import { sign } from "jsonwebtoken";
import { AppError } from "../../../shared/errors/AppError";
import { UserRepository } from "../../users/infra/typeorm/repositories/UserRepository";
import bcrypt from "bcryptjs";
import auth from "../../../config/auth";
import { User } from "../../users/infra/typeorm/entities/User";
import { RefreshTokenRepository } from "../infra/typeorm/repositories/RefresTokenRepository";

interface IResponse {
  token?: string;
  user: User;
}

class AuthenticationUserService {
  async execute(email: string, password: string): Promise<IResponse> {
    const userRepository = new UserRepository();
    const userTokenRepository = new RefreshTokenRepository();

    const user = await userRepository.findByEmail(email);
    const userToken = await userTokenRepository.findByToken(user.id);

    if (!user) {
      throw new AppError("Usuário ou senha incorreto(s)");
    }

    const pwd = await bcrypt.compare(password, user.password);

    if (!pwd) {
      throw new AppError("Usuário ou senha incorreto(s)");
    }

    // Assinando o token
    const token = sign({}, auth.auth_secret_token, {
      subject: user.id,
      expiresIn: auth.auth_expired_token,
    });

    await userTokenRepository.createUserToken(user.id);

    return {
      token,
      user,
    };
  }
}

export { AuthenticationUserService };
