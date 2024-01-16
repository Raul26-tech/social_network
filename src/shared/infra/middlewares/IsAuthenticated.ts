import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { verify } from "jsonwebtoken";
import auth from "../../../config/auth";

interface ITokenPayload {
  iat: string;
  exp: number;
  sub: string;
}

function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token inválido");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = verify(token, auth.auth_secret_token);

    const { sub } = decodedToken as unknown as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError(error);
  }
}

export { isAuthenticated };
