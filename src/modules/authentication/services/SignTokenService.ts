import { inject, injectable } from "inversify";
import { RefreshTokenRepository } from "../infra/typeorm/repositories/RefresTokenRepository";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import { randomBytes } from "crypto";
import dayjs from "dayjs";
import { SignTokenServiceDTO } from "../dto/SignTokenServiceDTO";

@injectable()
class SignTokenService {
  constructor(
    @inject("RefreshTokenRepository")
    private _refreshTokenRepository: RefreshTokenRepository
  ) {}

  async execute({ email, userId }: SignTokenServiceDTO) {
    // Gerando token
    const accesToken = sign({}, auth.auth_secret_token, {
      subject: userId,
      expiresIn: auth.auth_expired_token,
    });

    // Gerando um Refresh token
    const refreshToken = randomBytes(64).toString("hex");

    const iat = dayjs().toDate();
    const exp = dayjs().add(auth.auth_expired_refreshToken, "days").toDate();

    // Realizando a rotatividade do token

    // Com isto conseguimos garantir que o token do usuário nunca será mesmo
    // Desta maneira após um prazo determinado, necessáriamente o usuário é
    // obrigado a fazer Login novamente na aplicação
    const alreadyExistTokens = await this._refreshTokenRepository.findByTokenId(
      userId
    );

    if (alreadyExistTokens) {
      await Promise.all(
        alreadyExistTokens.map(async (token) => {
          await this._refreshTokenRepository.delete(token.id);
        })
      );
    }

    await this._refreshTokenRepository.create({
      userId,
      email,
      issuedAt: iat,
      expirationTime: exp,
      token: refreshToken,
    });

    return {
      accesToken,
      refreshToken,
    };
  }
}

export { SignTokenService };
