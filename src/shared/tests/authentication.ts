import { UserRepository } from "@modules/users/infra/typeorm/repositories/UserRepository";
import { describe, it } from "node:test";
import assert from "node:assert";
import { AuthenticationUserService } from "@modules/authentication/services/AuthenticationUserService";
import { IUserRepository } from "@modules/users/irepositories/IUserRepositories";
import { RefreshTokenRepository } from "@modules/authentication/infra/typeorm/repositories/RefresTokenRepository";

describe("Entrada de dados", () => {
  describe("Authentication()", () => {
    it("Authenticando com credenciais válidas", () => {
      const email = "zezin@gmail.com";
      const password = "123456";
      const user = new AuthenticationUserService(
        email as unknown as UserRepository,
        password as unknown as RefreshTokenRepository
      );

      assert.notStrictEqual(user, null);
    });
  });
});
