import swaggerJsdoc from "swagger-jsdoc";

const options = {
  failOnErros: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentation Unity Network API",
      version: "1.0.0",
      description: "Documentação da API",
    },
    supportedSubmitMethods: [""],
    operationsSorter: "method",
  },

  apis: ["./src/shared/infra/http/routes/index.ts"],
};

const specs = swaggerJsdoc(options);

export { specs };
