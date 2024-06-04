import { describe, expect } from "@jest/globals";
import { LoginService } from "@modules/authentication/services/LoginService";
import { container } from "@shared/container/inversify.config";

const loginService = container.resolve(LoginService);

describe("LoginService", () => {
  it("Deve autenticar o usuário com a senha e o email corretos", async () => {
    const email = "raul@gmail.com";
    const password = "123456";

    const result = await loginService.execute({ email, password });

    expect(result).toBe(true);
  });
});
