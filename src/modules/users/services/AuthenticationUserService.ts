import { sign } from "jsonwebtoken";
import { AppError } from "../../../shared/errors/AppError";
import { UserRepository } from "../infra/typeorm/repositories/UserRepository";
import bcrypt from "bcryptjs";
import auth from "../../../config/auth";
import { User } from "../infra/typeorm/entities/User";
import { UserTokenRepository } from "../infra/typeorm/repositories/UserTokenRepository";

interface IResponse {
  token?: string;
  user: User;
}

class AuthenticationUserService {
  async execute(email: string, password: string): Promise<IResponse> {
    const userRepository = new UserRepository();
    const userTokenRepository = new UserTokenRepository();

    const user = await userRepository.findByEmail(email);
    const userToken = await userTokenRepository.findByToken(user.id);

    if (!user) {
      throw new AppError("Usuário ou senha incorreto(s)");
    }

    const pwd = await bcrypt.compare(password, user.password);

    if (!pwd) {
      throw new AppError("Usuário ou senha incorreto(s)");
    }

    // 1 - Filtrar o token do usuário que está fazendo login
    // 3 - Caso o user já tenha token, atualizar o status do token para inativo e criar um novo token
    // 4 - se o usuário não estiver logado, ele fará o login normalmente

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
