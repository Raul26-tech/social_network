import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { connectDatabase } from "@shared/infra/db/connectDatabase";
import { catchErrors } from "../http/middlewares/catchError";
import { router } from "../http/routes";
import swaggerUi from "swagger-ui-express";
import { specs } from "swaggerConfig";

const app = express();
app.use(express.json());
app.use(router);

// Middleware de Erro
app.use(catchErrors);

// Conectando com o banco de dados
connectDatabase();

// Rota para acessar a documentação online da API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export { app };
