import { inject, injectable } from "inversify";
import { RefreshTokenRepository } from "../infra/typeorm/repositories/RefresTokenRepository";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import { randomBytes } from "crypto";
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
      expiresIn: `10s`,
      algorithm: "ES256",
    });

    // Gerando um Refresh token
    const refreshToken = randomBytes(64).toString("hex");

    let secretExpiresTime = auth.auth_expired_token as unknown as Date;
    let expires = new Date();

    const iat = new Date().getTime() as unknown as Date;
    const exp = expires.setTime(secretExpiresTime.getTime()) as unknown as Date;

    // Realizando a rottividade do token

    // Com isto conseguimos garantir que o token do usuário nunca será mesmo
    // Desta maneira após um prazo determinado, necessáriamente o usuário é
    // obrigado a fazer Login novamente na aplicação
    const alreadyExistTokens = await this._refreshTokenRepository.findByTokenId(
      userId
    );

    if (alreadyExistTokens) {
      (await Promise.all(alreadyExistTokens)).map(async (token) => {
        await this._refreshTokenRepository.delete(token.id);
      });
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
