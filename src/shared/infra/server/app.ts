import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { connectDatabase } from "@shared/infra/db/connectDatabase";
import { catchErrors } from "../http/middlewares/catchError";
import { router } from "../http/routes";
import swaggerUi from "swagger-ui-express";
import { specs } from "swaggerConfig";
import path from "path";
import environment from "@config/environment";

const app = express();
app.use(express.json());
app.use(router);

// Middleware de Erro
app.use(catchErrors);

// Conectando com o banco de dados
connectDatabase();

// Multer
const defaultMainPath = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "..",
  environment.STORAGE_PATH
);

app.use(
  `${environment.STORAGE_PATH}`,
  express.static(path.join(defaultMainPath))
);

// Rota para acessar a documentação online da API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Rota padrão do sistema
app.use("/", (request, response) => {
  return response.status(200).send({
    message:
      "Seja Bem-vindo(a) ao Unity Network, espero que goste da experiência de nossa rede e que você possa fazer muitos amigos!",
  });
});

export { app };
