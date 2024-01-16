import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";

interface IError {
  message: string;
  status?: number;
}

export async function catchErrors(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
): Promise<Response> {
  // Validando instância do erro
  if (error instanceof AppError) {
    const objectError: IError = {
      message: error.message,
      status: error.statusCode,
    };

    return response.status(error.statusCode).json(objectError);
  }

  return response.status(500).json({
    status: "error",
    message: `[Social Network] - Internal server error - ${error.message}`,
  });
}
