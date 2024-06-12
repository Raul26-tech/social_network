import auth from "@config/auth";
import { UserRepository } from "@modules/users/infra/typeorm/repositories/UserRepository";
import { inject, injectable } from "inversify";
import { verify } from "jsonwebtoken";
import { IVerifyTokenDTO } from "../dto/VerifyTokenDTO";

interface Payload {
  iat: number;
  exp: number;
  sub: string;
}

@injectable()
class VerifyTokenService {
  constructor(
    @inject("UserRepository")
    private _userRepository: UserRepository
  ) {}

  async execute({ bearerToken, ignoreExpiration = false }: IVerifyTokenDTO) {
    // Verifica se temos um TOKEN que foi passado através dos headers da aplicação
    if (!bearerToken) {
      throw new Error("Nenhum token de autenticação foi detectado.");
    }

    const [, token] = bearerToken.split(" ");
    const { auth_secret_token } = auth;

    const { sub } = verify(token, auth_secret_token, {
      ignoreExpiration,
    }) as Payload;

    const user = await this._userRepository.findById(sub);

    if (!user) {
      throw new Error("O usuário que foi informado não foi encontrado");
    }

    if (user.status !== "active") {
      throw new Error("O usuário informado não está ativo");
    }

    return {
      user,
    };
  }
}

export { VerifyTokenService };
