import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { connectDatabase } from "../typeorm/connectDatabase";
import { router } from "./routes";
import { AppError } from "../../errors/AppError";
import { catchErrors } from "../middlewares/catchError";

const app = express();
app.use(express.json());
app.use(router);

// Middleware de Erro
app.use(catchErrors);

// Conectando com o banco de dados
connectDatabase();

export { app };
