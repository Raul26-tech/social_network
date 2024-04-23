import { NextFunction, Request, Response } from "express";
import { container } from "@shared/container/inversify.config";
import { VerifyTokenService } from "@modules/authentication/services/VerifyTokenService";

async function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const verifyTokenService = container.resolve(VerifyTokenService);

  // Extraindo token JWT dos headers
  const bearerToken = request.headers.authorization;

  console.log({ bearerToken });

  // Executando a função que verifica a integridade do token
  const { user } = await verifyTokenService.execute({ bearerToken });

  request.user = user;

  next();
}

export { isAuthenticated };
