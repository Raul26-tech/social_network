import assert from "node:assert";
import { describe, it } from "node:test";
import { container } from "@shared/container/inversify.config";
import { LoginService } from "@modules/authentication/services/LoginService";

const loginService = container.resolve(LoginService);

describe("LoginService", () => {
  it("Deve autenticar o usuário com a senha e o email corretos", async () => {
    const email = "raul@gmail.com";
    const password = "123456";

    const result = await loginService.execute({ email, password });

    console.log(result);
  });
});
