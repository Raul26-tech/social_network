import { UserRepository } from "@modules/users/infra/typeorm/repositories/UserRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../shared/errors/AppError";
import bcrypt from "bcryptjs";
import auth from "../../../config/auth";
import { User } from "../../users/infra/typeorm/entities/User";
import { RefreshTokenRepository } from "../infra/typeorm/repositories/RefresTokenRepository";
import { container } from "@shared/container/inversify.config";
import { inject, injectable } from "inversify";

interface IResponse {
  token?: string;
  user: User;
}

@injectable()
class AuthenticationUserService {
  constructor(
    @inject("UserRepository")
    private _userRepository: UserRepository,
    @inject("RefreshTokenRepository")
    private _refreshTokenRepository: RefreshTokenRepository
  ) {}

  async execute(email: string, password: string): Promise<IResponse> {
    const user = await this._userRepository.findByEmail(email);
    const userToken = await this._refreshTokenRepository.findByToken(user.id);

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

    // await this._refreshTokenRepository.createUserToken({
    //   userId: user.id,
    //   email: user.email,
    // });

    return {
      token,
      user,
    };
  }
}

export { AuthenticationUserService };
